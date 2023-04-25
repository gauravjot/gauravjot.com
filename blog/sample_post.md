---
title: "Preview Mode for Static Generation"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/preview/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
    name: Joe Haddad
    picture: "/assets/blog/authors/joe.jpeg"
ogImage:
    url: "/assets/blog/preview/cover.jpg"
---

Nexus is a powerful social network web application. The application includes features such as fully customizable user profiles, a powerful dashboard, ability to connect with others as a friend, comment and leave replies to own or your friend's posts.

Nexus is a powerful social network web application. The application includes features such as fully customizable user profiles, a powerful dashboard, ability to connect with others as a friend, comment and leave replies to own or your friend's posts.

Nexus is a powerful social network web application. The application includes features such as fully customizable user profiles, a powerful dashboard, ability to connect with others as a friend, comment and leave replies to own or your friend's posts.

## Behind the scene

Things which Nexus is or does behind the scenes are:

-   Token Based Authentication
-   Uses browser's localstorage on frontend to save sessions
-   Reactjs and Redux
-   Frontend works independent of backend and vice versa

## How to run?

### Requirements

-   [Python](https://www.python.org/downloads/) (v3 and above)
-   [NodeJS](https://nodejs.org/en/)
-   PostgreSQL Server

### Steps

1. Once you have requirements met, you can either download the project from Github or clone the project using Git. To clone use `git clone https://github.com/gauravjot/social-network.git` in terminal or command prompt.
2. Naigate to project directory in terminal or command prompt and run `pip install -r piplist.txt` (use `pip3` if command with error `pip not found`). This will install necessary python packages to run the project.
3. Inside project folder, rename `.envsample` to `.env` and edit in a text editor to fill out the details for database. You can generate a random secret key with this [webtool](https://miniwebtool.com/django-secret-key-generator/).
4. Once `.env` file is setup properly, run commands in exact order: `python manage.py makemigrations` and then `python manage.py migrate` (use `python3` if `python not found`). This will setup the database for it to be ready to use.
5. After migration is successful, run `python manage.py runserver` and leave the server running.
6. Open a separate terminal or command prompt window and navigate to frontend folder within project.
7. Run `npm install` and then `npm run-script start`.
8. You should be able to see the project running on http://localhost:3000

## Contribute

Feel free to fork and make pull requests. Thank you to everyone who invests their effort and time!

```python
def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'socialnetwork.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
```
