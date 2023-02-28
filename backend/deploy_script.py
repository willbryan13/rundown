import subprocess
from io import BytesIO
import zipfile
import os
from pathlib import Path
import boto3
import sys
import shutil


SCRIPT_PATH = os.path.abspath(os.path.dirname(__file__))


def install_dependencies():
    build_path = f"{SCRIPT_PATH}/.build/"
    if os.path.exists(build_path) and os.path.isdir(build_path):
        shutil.rmtree(build_path)
    os.makedirs(build_path)
    shutil.copyfile(
        f"{SCRIPT_PATH}/lambda_handler.py", f"{build_path}lambda_handler.py"
    )
    subprocess.run(
        [
            "pip",
            "install",
            "-r",
            f"{SCRIPT_PATH}/code/requirements.txt",
            "-t",
            build_path,
            "--upgrade",
        ]
    )


def zip_dir():
    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED, False) as zip_file:
        files = list(Path(os.path.join(SCRIPT_PATH, ".build")).rglob("*"))
        for file_obj in files:
            if os.path.isfile(file_obj):
                with open(file_obj, "rb") as f:
                    content = f.read()
                    zip_file.writestr(
                        os.path.relpath(file_obj, os.path.join(SCRIPT_PATH, ".build")),
                        content,
                    )
    return zip_buffer.getvalue()


def deploy_lambda(function_name, zip):
    client = boto3.client("lambda")
    res = client.update_function_code(
        FunctionName=function_name,
        ZipFile=zip,
        Publish=True,
    )
    print(res)


def main(function_name):
    install_dependencies()
    zip = zip_dir()
    deploy_lambda(function_name, zip)


if __name__ == "__main__":
    function_name = sys.argv[1]
    main(function_name)
