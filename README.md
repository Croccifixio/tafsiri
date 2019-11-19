# Tafsiri

This is the CLI for a custom markdown parser.

## Usage

At the bare minimum the CLI expects a relative path to a folder containing markdown files.

Running the command below will parse all the markdown files within `src`. It will then output the resulting files into `src/.temp`.

```
npx tafsiri -d src
```

The output folder can be specified using the `-b` option as shown below:

```
npx tafsiri -d src -b dist
```

Passing the `-w` flag will make the CLI watch for changes in markdown files in the input directory. This will generate an output file each time one of the watched markdown files is saved.

```
npx tafsiri -d src -w
```

## Options

- `--src <src-directory>, -d`

  This is a __required__ flag that is used to specify the input directory. It expects a relative path.

- `--build <build-directory>, -b`

  This is an optional flag that is used to specify the output directory. It expects a relative path.

- `--watch, -w`

  This is an optional flag that if passed, will make the CLI watch for changes in markdown files.
