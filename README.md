# planethopper app

A traveling application that lets users browse through planets and plan their interstellar journey

## Run the project locally

### Serve app for Development

- Using **Docker**

  ```bash
  docker build -t planethopper-dev -f Dockerfile.dev .
  docker run --rm -p 5173:5173 planethopper-dev:latest
  ```

- Using PNPM (v10.6.1 recommended) :)

  > **_NOTE:_** Node v20.9.0 and above is recommended

  ```bash
  pnpm i
  pnpm run dev
  ```

- Using NPM

  > **_NOTE:_** Node v20.9.0 and above is recommended

  ```bash
  npm i
  npm run dev
  ```

Visit http://localhost:5173

### Build app for Production

```bash
docker build -t planethopper-prod:1.0.0 -f  Dockerfile.prod .
docker run -p 80:80 planethopper-prod:1.0.0
```

## Notable design decisions ⚖️

- **Responsiveness**: App has been designed to be accessible from users in both small and large
  devices
- **Portability**: well, docker!
- Respect to browser's theme settings: Color palettes for both dark and light modes of a browser's
  settings have been applied, in order to be accessible regardless the active mode. . Improvements
  on color palettes needed.
- Focus on good DX and UX, applying numerous eslint plugins(accessibility, organize imports and
  tailwind classes) as well as setting git hooks on commit actions
