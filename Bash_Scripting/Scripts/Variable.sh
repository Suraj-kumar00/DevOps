#!/bin/bash

# This is when we assign value to a variable
hello_message='Hello, world!'

# If we want to print the current directory along with the message 
current_dir=$(pwd)

#  And this is when we are using variable
echo "$hello_message from $curret_dir"
