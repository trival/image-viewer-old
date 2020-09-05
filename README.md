# image-viewer

## TODOs

- [ ] Add persistent state (Maybe with sqlite3
      https://github.com/mapbox/node-sqlite3 + typeorm)
- [ ] Use https://github.com/lovell/sharp and WebP for thumbnail compression
- [ ] Add preview mode
- [ ] keyboard navigation
- [ ] Add open in Finder / App functionality
- [ ] Add undestructive display and image processing options (rotate, transform,
      crop, ...)
- [ ] Add multiple library folder managment
- [ ] hide files or directories from preview
- [ ] star / tag photos
- [ ] adjust thumbnail image size
- [ ] zoom in full view
- [ ] add fancy animations :)
- [ ] add video support (for thumbnails:
      https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/blob/master/examples/thumbnails.js)
- [x] Add typescript support

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributing

Your contributions and suggestions are greatly appreciated. Submit your issues
and PRs on [github](https://github.com/trival/image-viewer). Please add unit
tests for any new or changed functionality. Format, lint and test your code with
the provided configurations.

## License

Distributed under the MIT License. See LICENSE for more information.
