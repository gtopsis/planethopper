# planethopper app

A traveling application that lets users browse through planets and plan their interstellar journey

## Run the project locally

### Serve app for Development

- Using **Docker**

  ```bash
  docker build -t planethopper -f Dockerfile.dev .
  docker run --rm -p 5173:5173 planethopper:latest
  ```

- Using PNPM (v10.6.1 recommended) :)

  > **_NOTE:_** Node v20.9.0 and above is recommended

  ```bash
  pnpm i
  pnpm run dev
  ```

  Visit http://localhost:5173

- Using NPM

  > **_NOTE:_** Node v20.9.0 and above is recommended

  ```bash
  npm i
  npm run dev
  ```

  Visit http://localhost:5173
