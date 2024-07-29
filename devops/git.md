
Git is a distributed version control system that tracks changes in your files, allowing you to revert to previous versions, collaborate with others, and maintain a history of your project.

1. **Basic Concepts**: 
 - **Repository (Repo)**: A directory containing your project files and the `.git` folder, which contains the version history.
 - **Commit**: A snapshot of your project at a point in time.
 - **Branch**: A parallel version of your project where you can make changes without affecting the main version.
 - **Merge**: Combining changes from different branches.
 - **Clone**: A copy of a remote repository on your local machine.
 - **Pull**: Fetching changes from a remote repository and merging them into your local branch.
 - **Push**: Sending your local changes to a remote repository.

### Git Basics

1. **Configuration**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   git config --list
   ```

2. **Initialization**
   ```bash
   git init
   ```

3. **Cloning a Repository**
   ```bash
   git clone <repository-url>
   ```

4. **Adding Files**
   ```bash
   git add <file-name>
   git add .
   git add *.txt
   ```

5. **Committing Changes**
   ```bash
   git commit -m "Commit message"
   git commit -a -m "Commit message"
   ```

6. **Status and Diff**
   ```bash
   git status
   git diff
   ```

7. **Log**
   ```bash
   git log
   git log --oneline
   git log --stat
   ```

### Branching and Merging

1. **Branching**
   ```bash
   git branch
   git branch <branch-name>
   git checkout <branch-name>
   git checkout -b <branch-name>
   ```

2. **Merging**
   ```bash
   git merge <branch-name>
   git merge --no-ff <branch-name>
   ```

3. **Rebasing**
   ```bash
   git rebase <branch-name>
   git rebase -i <commit-hash>
   ```

4. **Deleting a Branch**
   ```bash
   git branch -d <branch-name>
   git branch -D <branch-name>
   ```

### Remote Repositories

1. **Adding a Remote**
   ```bash
   git remote add origin <remote-url>
   git remote -v
   ```

2. **Fetching and Pulling**
   ```bash
   git fetch
   git pull
   ```

3. **Pushing Changes**
   ```bash
   git push origin <branch-name>
   git push -u origin <branch-name>
   ```

4. **Deleting Remote Branch**
   ```bash
   git push origin --delete <branch-name>
   ```

### Stashing Changes

1. **Stashing**
   ```bash
   git stash
   git stash save "Stash message"
   ```

2. **Listing Stashes**
   ```bash
   git stash list
   ```

3. **Applying Stashes**
   ```bash
   git stash apply
   git stash apply stash@{index}
   ```

4. **Dropping Stashes**
   ```bash
   git stash drop
   git stash drop stash@{index}
   ```

5. **Popping Stashes**
   ```bash
   git stash pop
   ```

### Undoing Changes

1. **Amending Commits**
   ```bash
   git commit --amend -m "New commit message"
   ```

2. **Resetting Changes**
   ```bash
   git reset --soft <commit-hash>
   git reset --hard <commit-hash>
   ```

3. **Reverting Commits**
   ```bash
   git revert <commit-hash>
   ```
   
### Workflow Examples

1. **Feature Branch Workflow**
   ```bash
   git checkout -b feature-branch
   # make changes
   git add .
   git commit -m "Add feature"
   git checkout main
   git merge feature-branch
   git push origin main
   ```

2. **Forking Workflow**
   ```bash
   git clone <forked-repo-url>
   git remote add upstream <original-repo-url>
   git fetch upstream
   git checkout main
   git merge upstream/main
   git push origin main
   ```

3. **Rebase Workflow**
   ```bash
   git checkout feature-branch
   git rebase main
   git checkout main
   git merge feature-branch
   git push origin main
   ```