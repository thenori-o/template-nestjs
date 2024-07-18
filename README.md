# Template Nestjs

## Description

This template provides a boilerplate for building web applications using Nest.js, Docker, and other modern development tools. It is designed to help developers quickly set up a scalable and maintainable project structure.

## Project Structure

```
manager-app/
├── .devcontainer/            # Remote Container configurations
├── .docker/                  # Docker scripts
├── .github/                  # Github Workflows and configurations
├── src/                      # Source code
│   ├── @core/                # Main code
│   └── nestjs/               # Nest.js framework implementation
├── Dockerfile                # Docker file for image building
├── docker-compose.yaml       # Docker Compose configuration
├── package.json              # NPM scripts and dependencies
├── tsconfig.base.json        # TypeScript configurations
└── README.md                 # Documentation
```

## Prerequisites

Before you begin, you'll need the following tools installed on your machine:

- Node.js
- Docker
- Docker Compose

## Installation

### Visual Studio Code Setup

For development, it's recommended to use Visual Studio Code with Remote Container extension to set up the Docker environment seamlessly. Here's how you can do it:

Clone the repository

```bash
git clone https://github.com/NewWaveLabs/manager-app.git 
cd manager-app 
```

Open Visual Studio Code in the project folder:

```bash
code . 
```

## Usage

### Development

To start the development environment, follow the steps below:

#### 1. Install Docker

Install the [Docker Engine](https://docs.docker.com/engine/install/) or [Docker Desktop](https://docs.docker.com/desktop/).

#### 2. Install Visual Studio Code

Download and install [Visual Studio](https://code.visualstudio.com/).

#### 3. Install Remote - Containers extension

Open Visual Studio Code, go to the Extensions view Ctrl+Shift+X, search for "Remote - Containers", and click Install.

#### 4. Open Project in Container:

<ul>
 <li>
 Once in Visual Studio Code, you'll be prompted with a notification suggesting to reopen the folder in a container. Click on "Reopen in Container" to let Remote - Containers automatically build the Docker environment, start it, and install all necessary project dependencies and extensions needed.

<br/>

This setup ensures that your development environment is consistently configured within the Docker container managed by Remote - Containers extension, streamlining setup, dependency management, and environment consistency.

</li>
</ul>

#### 5. Commands

Check the `scripts` section in the package.json files.

## Testing

To run tests, use the following command:

```bash
npm run test 
```

You can also open a `*.spec.ts` file and click on the `Run` buttons that will show up next the `describe`, `test` and `it` methods

## License

This project has no license yet.
