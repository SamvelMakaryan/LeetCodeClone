import sys
import subprocess

def compile_cpp_file():
    try:
        result = subprocess.run(['g++', 'file.cpp', '-o', 'file'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            with open('error.txt', 'w') as f:
                f.write(result.stderr)
        else:
            with open('error.txt', 'w') as f:
                f.write("passed")
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        return False

def compile_java_file():
    try:
        result = subprocess.run(['javac', 'file.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            with open('error.txt', 'w') as f:
                f.write(result.stderr)
        else:
            with open('error.txt', 'w') as f:
                f.write("passed")
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        return False

def compile_js_file():
    try:
        result = subprocess.run(['node', 'file.js', '0', '0'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            with open('error.txt', 'w') as f:
                f.write(result.stderr)
        else:
            with open('error.txt', 'w') as f:
                f.write("passed")
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        return False

def compile_python_file():
    try:
        result = subprocess.run(['python3', 'file.py', '0', '0'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            with open('error.txt', 'w') as f:
                f.write(result.stderr)
        else:
            with open('error.txt', 'w') as f:
                f.write("passed")
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        return False

def run_program(language, mode):
    if language == 'java':
        if not compile_java_file():
            return
        command = ['./TestCaseRunner', 'java', mode]
    elif language == 'js':
        if not compile_js_file():
            return
        command = ['./TestCaseRunner', 'js', mode]
    elif language == 'c++':
        if not compile_cpp_file():
            return
        command = ['./TestCaseRunner', 'c++', mode]
    elif language == 'python':
        if not compile_python_file():
            return
        command = ['./TestCaseRunner', 'python', mode]
    else:
        print("Unsupported language.")
        return

    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        with open('RunTime.txt', 'w') as f:
            f.write(result.stderr)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python compiler.py <language> <mode>")
        sys.exit(1)
    language = sys.argv[1]
    mode = sys.argv[2]
    run_program(language, mode)
