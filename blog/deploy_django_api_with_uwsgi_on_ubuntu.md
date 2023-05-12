---
title: "Deploy Django REST APIs on Ubuntu Server with uWSGI"
excerpt: "You have built yourself REST APIs with Django or you are trying to deploy them on an Ubuntu server. This article will be a walkthrough of the simplest approach."
coverImage: "/assets/blog_images/django_api_deploy.webp"
date: "2023-05-11T17:05:00Z"
edited: "2023-05-11T17:05:00Z"
author:
    name: Gaurarvjot Garaya
ogImage:
    url: "/assets/blog_images/django_api_deploy.webp"
---

We will setup the Django package for REST APIs; install required system packages on Ubuntu server; setup _supervisor_, a popular tool for ensuring our service is running and logging; and _NGINX_ configuration. If you want to setup certificates then you may additionally use Lets Encrypt's [certbot](https://certbot.eff.org/).

**What does this article not include?**

It does not include instructions for setting up the static directory for Django application. If this applies to you, then you may still follow this whereas applicable to your deployment.

### Ubuntu Packages

In this article we are using Ubuntu but these packages are available to almost any Linux based distribution.

```bash
sudo apt update &&
sudo apt install -y build-essential python3 python3-pip \
python3-dev python3-venv supervisor nginx &&
python3 -m pip install uwsgi &&
sudo mkdir /app &&
sudo mkdir /app/django
```

I like to use `app` directory at root of file system, you may choose a location which fits you the best.

### Django Setup

1. Save your Django project in `/app/django/` directory and `cd` into it. Create you virtual environment to install your Python packages. Here is a quick-how.

```bash
python3 -m venv venv &&
source ./venv/bin/activate &&
python3 -m pip install -r [requirements.txt]
```

2. Admin Portal: If you are using Django's built-in admin portal, you might want to import CSS and other static files which it uses to render itself. You can do so by creating a symlink to it under `/app/django/[appname]`.

```bash
ln -s venv/lib/python[YOUR-INSTALLATION-VERISON]/site-packages/django/contrib/admin/static/admin/ admin
```

3. We also need to ensure that correct permissions are setup so NGINX can access our project files. We can do so by making _www-data_ owner of `/app` directory used by NGINX. You can add yourself to the group with the second command.

```bash
chown -R www-data:www-data /app &&
usermod -a -G www-data $USER
```

4. For next steps, note down the paths to your django project and virtual environment.

```text
/app/django/[appname]
/app/django/[appname]/venv
/app/django/[appname]/admin
```

> You may additionally want to edit your `settings.py` file to set `DEBUG` to `False` or make CORS and CSRF changes.

### uWSGI Setup

Within `/app/django/[appname]` directory, make file `uwsgi-[appname].ini`. Here is what it has to include.

```text
[uwsgi]
chdir=/app/django/[appname]
module=[appname-or-core-package-name].wsgi:application
# Settings module
env='DJANGO_SETTINGS_MODULE=[appname-or-core-package-name].settings'
# Python vitual env
home=/app/django/[appname]/venv
master=True
pidfile=/tmp/django-[appname].pid
socket=127.0.0.1:8001
processes=5
vacuum=True
max-requests=5000
```

> You may need to includes configuration for plugins (`plugins=python3[x]`, `plugins-dir=/usr/lib/uwsgi/plugins`) if you installed uwsgi as a system package and not Python's pip. I recommend to use Python package and the same is recommended by [Django's documentation](https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/uwsgi/).

### Supervisor Setup

As per [official website](http://supervisord.org/), _Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems._ This is useful to us as it can control our uWSGI process and ensure our Django application stays up and running.

Now lets navigate to it's config directory.

```bash
cd /etc/supervisor/conf.d/
```

Here make a file `supervisor.conf` to store our configuration. Supervisor will use this config to spawn or restart our server instances.

```text
[program:uwsgi]
command=uwsgi --ini /app/django/[appname]/uswgi-[appname].ini
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/supervisor/uwsgi-[appname].log
```

And then restart the _supervisor_ service.

```bash
sudo systemctl restart supervisor
```

To ensure that uWSGI process is spawned properly, you can check the log file we indicated in the config or check active ports on machine with `lsof`.

```bash
sudo tail -F /var/log/supervisor/uwsgi-[appname].log
```

```bash
sudo lsof -i :8001
```

**Now there are some possibilities. Few commons one are:**

1. uWSGI processes spawned as expected. Hurray!
2. uWSGI cannot be found. In that case use path `/home/[user-name]/.local/bin/uwsgi` for command and restart _supervisor_ service.

### NGINX Setup

To listen to our uWSGI process, you need to setup NGINX. Starts by making the configuration file with your favorite text editor.

```bash
sudo nano /etc/nginx/sites-enabled/[domain-com]
```

A basic configuration that will work for us looks like this.

```text
server {
  listen 80;
  index index.html index.htm;

  server_name localhost;

  # For Django Admin static files
  location /static/admin/ {
        alias /app/django/appname/admin/;
    }

  location / {
    include uwsgi_params;
    uwsgi_pass 127.0.0.1:8001;
  }
}
```

You can change `localhost` to your domain name here. After this restart NGINX and you should be able to open _http://localhost_ in browser.

```bash
sudo systemctl restart nginx.service
```

### Install SSL Certificate

Although, we are done with what we set out to achieve at start of this article, we can go one step further and install SSL certificates from Let's Encrypt.

Follow installation isntructions for certbot: https://certbot.eff.org/

Make sure that you have firewall rule enabled to _tcp/80_ and _tcp/443_ if you can reach to your server from internet.

To install a certificate, run this command and follow the instructions.

```bash
sudo certbot --nginx
```
