---
title: "Build a CLI To-Do Application with Go Lang"
excerpt: "In this article, we will make a CLI based To-Do app with Go that you can run natively in Linux or Windows."
coverImage: "/assets/blog_images/go_lang_cli_title.webp"
date: "2024-03-09T22:07:32Z"
edited: "2024-03-09T22:07:32Z"
author:
    name: Gauravjot Garaya
    picture: "https://avatars.githubusercontent.com/u/11373684"
ogImage:
    url: "/assets/blog_images/go_lang_cli_title.webp"
---

### Why do this?

In this article, we will make a CLI based To-Do app with Go that you can run natively in Linux or Windows. This will be a simple application that will help you get familiar with creating, reading, updating, and deleting data in Go. With the knowledge of this, you can go on to build more complex CLI applications in Go.

### Requirements

I will start by setting some requirements for the application.

1. It should be able to create, edit, read, and delete todos.
2. It should be able to save the todos to a `.csv` file.

Here is the GitHub repository for the final code: <https://github.com/gauravjot/golang-todolist-cli>

### Setting up the project

We will start by creating a new directory for our project and initializing a new Go module.

```bash
mkdir todoapp
cd todoapp
go mod init todoapp
```

![Terminal Image creating a new directory and initializing a new Go module](/assets/blog_images/go_lang_cli_terminal_1.webp)

After, we can create a file `main.go` which will be the entry point of our application. In this file, we need to listen to the user input and perform the requested operations. Let's see how we can do that.

```go
package main

import (
  "os"
  "fmt"
)

func main() {
  if len(os.Args) > 1 {
    if os.Args[1] == "add" {
      // Add a new todo
      fmt.Println("Adding a new todo")
    } else if os.Args[1] == "list" {
      // List all todos
      fmt.Println("Listing all todos")
    } else if os.Args[1] == "delete" {
      // Delete a todo
      fmt.Println("Deleting a todo")
    } else if os.Args[1] == "edit" {
      // Edit a todo
      fmt.Println("Editing a todo")
    }
  }
}
```

![Running main.go](/assets/blog_images/go_lang_cli_vscode1.webp)

Now when running the application with `go run main.go add`, it will print `Adding a new todo`. Similarly, for other commands. This is just sample code for easy understanding and we will go over setting up each command in next sections.

### Core.go File

But first, to keep things clean and simple, we will need to create a `core.go` file. Inside, we can define a `Todo` struct which will have a `id`, `text`, `dateDue`, `dateCreated`, and `dateCompleted` fields. We can then use it to define a `TodoList` type as it will be a slice of `Todo` structs. We will also need a `filename` variable so that program knows where to save todos.

<codemeta>core.go</codemeta>

```go
package main

import (
  "encoding/csv"
  "fmt"
  "os"
  "strconv"
  "strings"
)

type Task struct {
  id            int
  text          string
  dateDue       int64
  dateCreated   int64
  dateCompleted int64
}

type TaskList []Task

var filename string = "userdata.csv"
```

At this point, the file will have errors as we have not defined the functions for the `Task` struct and `TaskList` type, nor have we used any of the imports and the `filename` variable. We will define these in the next sections.

#### Add Command

We will start by implementing the add command. Inside `core.go`, we need to create a new function `addTask` for Task struct. I choose to attach the function to the `Task` struct so that it can be called on a `Task` object. You may also choose to make it a standalone function and pass the `Task` object as an argument.

Now lets go over the steps we need to follow to add a new task.

1. We search for the highest id and increment it by 1.
2. We open the `.csv` data file.
3. We write the new task to the file.
4. We close the file.
5. We return the new task when finished.

Now let's see how we can implement this in Go.

<codemeta>core.go</codemeta>

```go
func (task Task) addTask() (Task, error) {
  // Steps we follow

  /*
   * 1. We search for the highest id and increment it by 1
   * 2. We open the .csv data file.
  */

  f, err := os.OpenFile(filename, os.O_CREATE|os.O_RDWR|os.O_APPEND, 0644)
  if err != nil {
    fmt.Println(err)
    return Task{}, err
  }

  /*
   * 4. This closes the file at end of function.
  */
  defer f.Close()

  reader := csv.NewReader(f)
  records, _ := reader.ReadAll() // Read file contents
  if len(records) < 1 {
    _writeHeadingToFile(f) // Write heading to csv file if it is empty
  }

  var new_id int // New id for the task
  if len(records) > 1 {
    id, _ := strconv.Atoi(records[len(records)-1][0]) // last id
    new_id = id + 1
  } else {
    new_id = 0
  }

  /*
   * 3. Write the new task to the file.
  */
  csvWriter := csv.NewWriter(f)
  csvWriter.Write([]string{
    strconv.Itoa(new_id),
    strings.TrimSpace(task.text),
    strconv.FormatInt(task.dateDue, 10),
    strconv.FormatInt(task.dateCreated, 10),
    strconv.FormatInt(task.dateCompleted, 10),
  })
  csvWriter.Flush()

  /*
   * 5. Return the new task when finished.
  */
  return Task{
    id:            new_id,
    text:          strings.TrimSpace(task.text),
    dateDue:       task.dateDue,
    dateCreated:   task.dateCreated,
    dateCompleted: task.dateCompleted,
  }, nil
}
```

Here is the `_writeHeadingToFile` function which writes the heading to the file if it is empty.

<codemeta>core.go</codemeta>

```go
func _writeHeadingToFile(f *os.File) {
  csvWriter := csv.NewWriter(f)
  csvWriter.Write([]string{"id", "text", "dateDue", "dateCreated", "dateCompleted"})
  csvWriter.Flush()
}
```

#### List Command

Next, we will implement the list command. We will create a new function `getTasks` for the `TaskList` type. This function will read the `.csv` file and return a list of tasks. Here are the steps we need to follow to list all tasks.

1. We open the `.csv` data file.
2. We read the file contents.
3. We convert the file contents to a list of tasks.
4. We close the file.
5. We return the list of tasks when finished.

The only thing we need to be careful about is that we need to skip the first line of the file as it contains the headings for CSV. Let's see how we can implement this in Go.

<codemeta>core.go</codemeta>

```go
func (tasklist TaskList) getTasks() (TaskList, error) {
  /*
   * 1. We open the .csv data file.
  */
  f, err := os.OpenFile(filename, os.O_CREATE|os.O_RDWR|os.O_APPEND, 0644)
  if err != nil {
    fmt.Println(err)
    return []Task{}, err
  }
  defer f.Close() // 4. Closing at function end.

  /*
   * 2. We read the file contents.
  */
  reader := csv.NewReader(f)
  records, err := reader.ReadAll()
  if len(records) > 1 {
    records = records[1:] // Omit first line as it is heading

    /*
     * 3. We convert the file contents to a list of tasks.
    */
    var tasks []Task
    for _, record := range records {
      id, _ := strconv.Atoi(record[0])
      dateDue, _ := strconv.ParseInt(record[2], 10, 64)
      dateCreated, _ := strconv.ParseInt(record[3], 10, 64)
      dateCompleted, _ := strconv.ParseInt(record[4], 10, 64)
      tasks = append(tasks, Task{
        id:            id,
        text:          record[1],
        dateDue:       dateDue,
        dateCreated:   dateCreated,
        dateCompleted: dateCompleted,
      })
    }
    /*
     * 5. We return the list of tasks when finished.
    */
    return tasks, err
  } else {
    return []Task{}, err
  }
}
```

#### Edit Command

In a similar fashion to above two commands, we can implement the edit command. We will create a new function `editTask` for the `Task` struct. This function will edit the task and return the updated task.

The main thing to know here is that we will need to remove the old file and then recreate it with our updated task. It is not possible to edit a specific line in-place for a file in Go. Now you can follow all the steps as you read along the code.

<codemeta>core.go</codemeta>

```go
func (alteredTask Task) editTask() (Task, error) {
  /*
   * 1. We get all the tasks from the file.
  */
  allTasks, err := TaskList{}.getTasks()
  if err != nil {
    fmt.Println(err)
    return alteredTask, err
  }

  /*
   * 2. We remove the old file.
  */
  os.Remove(filename)

  /*
   * 3. We create a new file and initialize a csv writer.
  */
  file, _ := os.Create(filename)
  csvWriter := csv.NewWriter(file)
  _writeHeadingToFile(file) // Write heading to csv file

  for _, task := range allTasks {
    newText := task.text
    /*
     * 4. We update the task if it matches the altered task.
    */
    if task.id == alteredTask.id {
      newText = strings.TrimSpace(alteredTask.text)
    }
    /*
     * 5. We write the task to the file.
    */
    csvWriter.Write([]string{
      strconv.Itoa(task.id),
      newText,
      strconv.FormatInt(task.dateDue, 10),
      strconv.FormatInt(task.dateCreated, 10),
      strconv.FormatInt(task.dateCompleted, 10),
    })
    csvWriter.Flush()
  }

  /*
   * 6. We return the updated task.
  */
  return alteredTask, nil
}
```

#### Delete Command

Finally, we will implement the delete command. We will create a new function `deleteTask` for the `Task` struct. Again, we will need to remove the old file and then recreate it without our deleted task.

<codemeta>core.go</codemeta>

```go
func (taskToDelete Task) deleteTask() error {
  /*
   * 1. We get all the tasks from the file.
  */
  allTasks, err := TaskList{}.getTasks()
  if err != nil {
    fmt.Println(err)
    return err
  }

  /*
   * 2. We remove the old file.
  */
  os.Remove(filename)

  /*
   * 3. We create a new file and initialize a csv writer.
  */
  file, _ := os.Create(filename)
  csvWriter := csv.NewWriter(file)
  _writeHeadingToFile(file)

  for _, task := range allTasks {
    /*
     * 4. We write the task to the file if it does not match the task to delete.
    */
    if task.id != taskToDelete.id {
      csvWriter.Write([]string{
        strconv.Itoa(task.id),
        task.text,
        strconv.FormatInt(task.dateDue, 10),
        strconv.FormatInt(task.dateCreated, 10),
        strconv.FormatInt(task.dateCompleted, 10),
      })
    }
  }
  return nil
}
```

### `main.go` File

Now that we have the functions done, we can go back to the `main.go` file and implement the commands. This is how our `main.go` file will look like.

<codemeta>main.go</codemeta>

```go
package main

import (
  "bufio"
  "fmt"
  "os"
  "strconv"
  "time"
)

func main() {
  // Get args if user types "list"
  if len(os.Args) > 1 {
    primaryArg := os.Args[1]
    if primaryArg == "list" {
      /*
      * List
      */
      file, err := os.Open("userdata.csv")
      if err != nil {
        fmt.Println(err)
        return
      }
      defer file.Close()
      records, err := TaskList{}.getTasks()
      if err != nil {
        fmt.Println(err)
        return
      }
      // Print the file
      for _, task := range records {
        fmt.Print("ID: " + strconv.Itoa(task.id) + " | ")
        fmt.Print("Todo: " + task.text)
        fmt.Print(" | Date created: " + time.Unix(task.dateCreated, 0).String())
        fmt.Print(" | Date due: " + time.Unix(task.dateDue, 0).String())
        fmt.Print(" | Date completed: " + time.Unix(task.dateCompleted, 0).String())
        fmt.Print("\n")
      }
    } else if primaryArg == "add" {
      /*
      * Add
      */
      reader := bufio.NewReader((os.Stdin))
      fmt.Print("Enter todo: ")
      text, err := reader.ReadString('\n')
      if err != nil {
        fmt.Println(err)
      }

      msg := fmt.Sprintln(text)
      task, _ := Task{
        id:            0,
        text:          msg,
        dateDue:       0,
        dateCreated:   time.Now().Unix(),
        dateCompleted: 0,
      }.addTask()

      fmt.Println("\nTodo added!")
      fmt.Println("Todo text > " + task.text)
      fmt.Println("Todo id > " + strconv.Itoa(task.id))
    } else if primaryArg == "edit" || primaryArg == "update" {
      /*
      * Edit
      */
      // get next argument containing id
      id, err := strconv.Atoi(os.Args[2])
      if err != nil {
        fmt.Println(err)
        return
      }
      reader := bufio.NewReader((os.Stdin))
      fmt.Print("Edit todo title: ")
      text, err := reader.ReadString('\n')
      if err != nil {
        fmt.Println(err)
      }

      msg := fmt.Sprintln(text)

      task, err := Task{
        id:            id,
        text:          msg,
        dateDue:       0,
        dateCreated:   time.Now().Unix(),
        dateCompleted: 0,
      }.editTask()

      if err != nil {
        fmt.Println(err)
        return
      }
      fmt.Println("\nTodo " + strconv.Itoa(task.id) + " updated > " + task.text)
    } else if primaryArg == "del" || primaryArg == "delete" || primaryArg == "remove" {
      /*
      * Delete
      */
      // get next argument containing id
      id, err := strconv.Atoi(os.Args[2])
      if err != nil {
        fmt.Println(err)
        return
      }
      error := Task{
        id:            id,
        text:          "",
        dateDue:       0,
        dateCreated:   0,
        dateCompleted: 0,
      }.deleteTask()
      if error != nil {
        fmt.Println(error)
        return
      }
      fmt.Println("\nTodo " + strconv.Itoa(id) + " deleted")
    } else {
      /*
      * Help
      */
      fmt.Println("Here are the available commands:")
      fmt.Println("\n- List all todos")
      fmt.Println("\n\ttodolist list")
      fmt.Println("\n- Add a todo")
      fmt.Println("\n\ttodolist add")
      fmt.Println("\n- Edit a todo")
      fmt.Println("\n\ttodolist edit|update <id>")
      fmt.Println("\n- Delete a todo")
      fmt.Println("\n\ttodolist del|delete|remove <id>")
    }
  } else {
    fmt.Println("Run following command for help.\n\ntodoapp help")
  }
}
```

### Running the Application

Now that we have implemented all the commands, we can run the application. Here is how you can run the application.

```bash
go run main.go core.go add
```

![Running application](/assets/blog_images/go_lang_cli_vscode2.webp)

You can also run the application with other commands like `list`, `edit`, and `delete`.

I hope you enjoyed this article and learned something new. You can find the complete code for this application on GitHub: <https://github.com/gauravjot/golang-todolist-cli>
