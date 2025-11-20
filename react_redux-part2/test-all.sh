#!/bin/bash

# Script to test all tasks in react_redux-part2

echo "=================================="
echo "Testing all tasks in react_redux-part2"
echo "=================================="

for task in task_0 task_1 task_2 task_3; do
  echo ""
  echo "=== Building $task ==="
  cd $task/dashboard

  # Check if node_modules exists
  if [ ! -d "node_modules" ]; then
    echo "Installing dependencies for $task..."
    npm install > /dev/null 2>&1
  fi

  # Run build
  echo "Building $task..."
  if npm run build > /dev/null 2>&1; then
    echo "✓ $task build succeeded"
  else
    echo "✗ $task build failed"
  fi

  cd ../..
done

echo ""
echo "=================================="
echo "All builds completed!"
echo "=================================="
