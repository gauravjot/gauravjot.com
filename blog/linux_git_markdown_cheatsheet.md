---
title: "Cheatsheet for Linux, Git and Markdown"
excerpt: "This is combined cheatsheet for Linux, Git and Markdown. It contains useful commands and formatting instructions and it a handy tool in any dev's toolkit."
date: "2024-02-04T07:31:00Z"
edited: "2024-02-04T07:31:00Z"
author:
    name: Gauravjot Garaya
---

### Linux

#### Basic Commands

| Command                     | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `ls`                        | Lists all files and directories in the present working directory                           |
| `ls -R`                     | Lists files in sub-directories as well                                                     |
| `ls -a`                     | Lists hidden files as well                                                                 |
| `ls -al`                    | Lists files and directories with detailed information like permissions,size, owner, etc.   |
| `cd ~`                      | Navigate to HOME directory                                                                 |
| `cd ..`                     | Move one level up                                                                          |
| `cd`                        | To change to a particular directory                                                        |
| `cd /`                      | Move to the root directory                                                                 |
| `cat > filename`            | Creates a new file                                                                         |
| `cat filename`              | Displays the file content                                                                  |
| `cat file1 file2 > file3`   | Joins two files (file1, file2) and stores the output in a new file (file3)                 |
| `mv file "new file path"`   | Moves the files to the new location                                                        |
| `mv filename new_file_name` | Renames the file to a new filename                                                         |
| `sudo`                      | Allows regular users to run programs with the security privileges of the superuser or root |
| `rm filename`               | Deletes a file                                                                             |
| `man`                       | Gives help information on a command                                                        |
| `history`                   | Gives a list of all past commands typed in the current terminal session                    |
| `clear`                     | Clears the terminal                                                                        |
| `mkdir directoryname`       | Creates a new directory in the present working directory or a at the specified path        |
| `rmdir`                     | Deletes a directory                                                                        |
| `mv`                        | Renames a directory                                                                        |

#### File Permissions

| Command                     | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `ls -l`                     | to show file type and access permission                  |
| `r`                         | read permission [4]                                      |
| `w`                         | write permission [2]                                     |
| `x`                         | execute permission [1]                                   |
| `-=`                        | no permission                                            |
| `chown user`                | For changing the ownership of a file/directory           |
| `chown user:group filename` | change the user as well as group for a file or directory |
| `chmod 775 filename`        | change file permissions                                  |
| `chmod -R 660 directory`    | recursively chmod folder                                 |

#### Reading Files

| Command            | Description                       |
| ------------------ | --------------------------------- |
| `less filename`    | view and paginate file            |
| `file filename`    | get type of file                  |
| `head filename`    | show first 10 lines               |
| `tail filename`    | show last 10 lines                |
| `tail -F filename` | show last 10 lines as they change |

#### Compression

##### Compress

`tar -czvf name-of-archive.tar.gz /path/to/directory-or-file`

| Command | Description                                                     |
| ------- | --------------------------------------------------------------- |
| `c`     | Create an archive                                               |
| `z`     | Compress the archive with gzip.                                 |
| `v`     | Verbose output shows you all the files being archived and much. |
| `f`     | Allows you to specify the filename of the archive.              |

##### Extract

`tar -xvzf name-of-archive.tar.gz`

| Command | Description                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `x`     | Tar can collect files or extract them. x does the latter.                                                                                   |
| `v`     | Verbose output shows you all the files being extracted.                                                                                     |
| `z`     | Tells tar to decompress the archive using gzip                                                                                              |
| `f`     | It must be the last flag of the command, and the tar file must be immediately after. It tells tar the name and path of the compressed file. |

#### User Management

| Command                                 | Description                                  |
| --------------------------------------- | -------------------------------------------- |
| `sudo adduser username`                 | To add a new user                            |
| `sudo passwd -l 'username'`             | To change the password of a user             |
| `sudo userdel -r 'username'`            | To remove a newly created user               |
| `sudo usermod -a -G GROUPNAME USERNAME` | To add a user to a group                     |
| `sudo deluser USER GROUPNAME`           | To remove a user from a group                |
| `finger`                                | Shows information of all the users logged in |
| `finger username`                       | Gives information of a particular user       |

#### Networking

| Command                                 | Description                                   |
| --------------------------------------- | --------------------------------------------- |
| `ssh username@<ip-address-or-hostname>` | login into a remote Linux machine using SSH   |
| `put file`                              | upload ‘file’ from local to remote computer   |
| `get file`                              | Download ‘file’ from remote to local computer |
| `quit`                                  | Logout                                        |

#### Process

| Command    | Description                                     |
| ---------- | ----------------------------------------------- |
| `bg`       | To send a process to the background             |
| `fg`       | To run a stopped process in the foreground      |
| `top`      | Details on all Active Processes                 |
| `ps`       | Give the status of processes running for a user |
| `ps PID`   | Gives the status of a particular process        |
| `pidof`    | Gives the Process ID (PID) of a process         |
| `kill PID` | Kills a process                                 |
| `nice`     | Starts a process with a given priority          |
| `renice`   | Changes priority of an already running process  |
| `df`       | Gives free hard disk space on your system       |
| `free`     | Gives free RAM on your system                   |

---

### Git

#### Configuration

Set the name that will be attached to your commits and tags

```bash
git config --global user.name "name"
```

Set an email address that will be attached to your commits and tags

```bash
git config --global user.email "email"
```

Enable some colorization of Git output

```bash
git config --global color.ui auto
```

Edit the global configuration file in a text editor

```bash
git config --global --edit
```

---

#### Create a repository

Create a new local repository

```bash
git init [project name]
```

Clone a repository

```bash
git clone git_url
```

Clone a repository into a specified directory

```bash
git clone git_url my_directory
```

---

#### Make Change

Show modified files in working directory, staged for your next commit

```bash
git status
```

Stages the file, ready for commit

```bash
git add [file]
```

Stage all changed files, ready for commit

```bash
git add .
```

Commit all staged files to versioned history

```bash
git commit -m "commit message"
```

Commit all your tracked files to versioned history

```bash
git commit -am "commit message"
```

Discard changes in working directory which is not staged

```bash
git restore [file]
```

Unstage a staged file or file which is staged

```bash
git restore --staged [file]
```

Unstages file, keeping the file changes

```bash
git reset [file]
```

Revert everything to the last commit

```bash
git reset --hard
```

Apply any commits of current branch ahead of specified one

```bash
git rebase [branch]
```

---

#### Remote

Add a git URL as an alias

```bash
git remote add [alias] [url]
```

Show the names of the remote repositories you've set up

```bash
git remote
```

Show the names and URLs of the remote repositories

```bash
git remote -v
```

Remove a remote repository

```bash
git remote rm [remote repo name]
```

Change the URL of the git repository

```bash
git remote set-url origin [git_url]
```

---

#### Branches

List all local branches

```bash
git branch
```

List all branches, local and remote

```bash
git branch -av
```

Switch to my_branch, and update working directory

```bash
git checkout my_branch
```

Create a new branch called new_branch

```bash
git checkout -b new_branch
```

Delete the branch called my_branch

```bash
git branch -d my_branch
```

Merge branchA into branchB

```bash
git checkout branchB
git merge branchA
```

Tag the current commit

```bash
git tag my_tag
```

---

#### See Changes

See all changes

```bash
git diff
```

Diff of what is staged but not yet committed

```bash
git diff --staged
```

See changed file names and status only

```bash
git diff --name-status
```

See compact summary of changes

```bash
git diff --compact-summary
```

Tip: Use watch command to keep track.

#### Temporary Commits

Save modified and staged changes

```bash
git stash
```

List stack-order of stashed file changes

```bash
git stash list
```

Write working from top of stash stack

```bash
git stash pop
```

Discard the changes from top of stash stack

```bash
git stash drop
```

---

#### Sync

Fetch down all the branches from that Git remote

```bash
git fetch [alias]
```

Merge a remote branch into your current branch to bring it up to date

```bash
git merge [alias]/[branch]
# No fast-forward
git merge --no-ff [alias]/[branch]
# Only fast-forward
git merge --ff-only [alias]/[branch]
```

Transmit local branch commits to the remote repository branch

```bash
git push [alias] [branch]
```

Fetch and merge any commits from the tracking remote branch

```bash
git pull
```

Merge just one specific commit from another branch to your current branch

```bash
git cherry-pick [commit_id]
```

---

### Markdown

#### Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

| Element         | Markdown Syntax                                          |
| --------------- | -------------------------------------------------------- |
| Heading         | `# H1` `## H2` `### H3`                                  |
| Bold            | `**bold text**`                                          |
| Italic          | `*italicized text*`                                      |
| Blockquote      | `> blockquote`                                           |
| Strike-through  | `~~The world is flat.~~`                                 |
| Ordered List    | `1. First item`<br/>`2. Second item`<br/>`3. Third item` |
| Unordered List  | `- First item`<br/>`- Second item`<br/>`- Third item`    |
| Code            | `` `code` ``                                             |
| Horizontal Rule | `---`                                                    |
| Link            | `[title](https://www.example.com)`                       |
| Image           | `![alt text](image.jpg)`                                 |

#### Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

##### Table

```md
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

##### Code Block

Make sure backticks have no space like this ```

```md
` ` `json
{
	"firstName": "John",
	"lastName": "Smith",
	"age": 25
}
` ` `
```

##### Tasklist

```md
-   [x] Write the press release
-   [ ] Update the website
-   [ ] Contact the media
```

##### More

| Element         | Markdown Syntax                                                             |
| --------------- | --------------------------------------------------------------------------- |
| Footnote        | `Here's a sentence with a footnote. [^1]`<br/>`[^1]: This is the footnote.` |
| Heading ID      | `### My Great Heading {#custom-id}`                                         |
| Definition List | `term`<br/>`: definition`                                                   |
| Highlight       | `I need to highlight these ==very important words==`.                       |
| Subscript       | `H~2~O`                                                                     |
| Superscript     | `X^2^`                                                                      |
