FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy all source files to the working directory
COPY . /app

# Run the application
CMD ["gunicorn", "-b", ":5000", "app:app"]
