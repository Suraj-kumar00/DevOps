# Git Commands:

Here are some commonly used Git commands that you will use daily.

- `git init`: Initializes a new Git repository.
- `git clone <url>`: Creates a copy of a remote repository.
- `git status`: Shows the status of changes as untracked, modified, or staged.
- `git add <file>`: Adds a file to the staging area.
- `git commit -m "<message>"`: Commits the staged snapshot with a log message.
- `git pull <remote> <branch>`: Fetches changes from a remote repository and merges them into the current branch.
- `git push <remote> <branch>`: Pushes local branch commits to the remote repository.
- `git branch`: Lists all local branches in the current repository.
- `git checkout <branch>`: Switches to the specified branch and updates the working directory.
- `git merge <branch>`: Merges the specified branch’s history into the current branch.
- `git log`: Displays committed snapshots. Useful for viewing changes to the project over time.


## Some more advace Git commands:

As a DevOps engineer, you might find yourself using a wider range of Git commands to manage complex workflows. Here are some additional commands that could be useful:

- `git diff`: Shows file differences not yet staged.
- `git reset`: Resets the staging area to match the most recent commit, but leaves the working directory unchanged.
- `git revert <commit>`: Creates a new commit that undoes all of the changes made in `<commit>`, then apply it to the current branch.
- `git fetch <remote>`: Fetches all branches from the remote repository.
- `git rebase <branch>`: Reapply commits on top of another base tip.
- `git stash`: Temporarily saves changes that you don’t want to commit immediately.
- `git tag <tagname>`: Marks a specific commit with a simple, human readable handle that never moves.
- `git cherry-pick <commit>`: Apply the changes introduced by some existing commits.
