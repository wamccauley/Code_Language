
## Grep

`grep` is a powerful command-line utility in Linux used for searching plain-text data sets for lines that match a regular expression, and its name stands for "global regular expression print."

### Basic Syntax
```sh
grep [OPTIONS] PATTERN [FILE...]
```

- `PATTERN`: The regular expression or string to search for.
- `FILE`: The file or files to search within. If no file is specified, `grep` searches the standard input.

### Commonly Used Options
- `-i`: Ignore case distinctions in both the PATTERN and the input files.
- `-v`: Invert the sense of matching, to select non-matching lines.
- `-r` or `-R`: Read all files under each directory, recursively.
- `-n`: Prefix each line of output with the line number within its input file.
- `-l`: Print only the names of files with at least one matching line.
- `-c`: Print only a count of matching lines per input file.
- `-H`: Print the file name for each match.

### Examples

1. **Basic Search**
   ```sh
   grep "hello" file.txt
   ```
   Searches for the string "hello" in `file.txt`.

2. **Case-Insensitive Search**
   ```sh
   grep -i "hello" file.txt
   ```
   Searches for "hello" in a case-insensitive manner in `file.txt`.

3. **Search Recursively**
   ```sh
   grep -r "hello" /path/to/directory
   ```
   Searches for "hello" in all files under `/path/to/directory`.

4. **Count Matching Lines**
   ```sh
   grep -c "hello" file.txt
   ```
   Counts the number of lines that contain "hello" in `file.txt`.

5. **Display Line Numbers**
   ```sh
   grep -n "hello" file.txt
   ```
   Displays matching lines along with their line numbers in `file.txt`.

6. **Search for Whole Words**
   ```sh
   grep -w "hello" file.txt
   ```
   Searches for lines containing the whole word "hello" in `file.txt`.

7. **Invert Match**
   ```sh
   grep -v "hello" file.txt
   ```
   Displays lines that do not contain "hello" in `file.txt`.

8. **Multiple Files**
   ```sh
   grep "hello" file1.txt file2.txt
   ```
   Searches for "hello" in both `file1.txt` and `file2.txt`.

### Using Regular Expressions
`grep` supports extended regular expressions (ERE) with the `-E` option, which allows for more complex pattern matching.

```sh
grep -E "hello|world" file.txt
```
This searches for lines containing either "hello" or "world" in `file.txt`.

### Piping and Redirection
`grep` is often used in combination with other commands using pipes.

```sh
cat file.txt | grep "hello"
```
This searches for "hello" in the output of `cat file.txt`.

### Grep in Scripts
`grep` is frequently used in shell scripts for processing and filtering text data. Here’s a simple example:

```sh
#!/bin/bash
# Script to find and count occurrences of "error" in log files
for file in /var/log/*.log; do
    echo "Processing $file"
    grep -c "error" "$file"
done
```
