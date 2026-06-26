import {
  generateDocs,
  generateInstalledDenoScripts,
  generateLintRules,
  generateTasks,
  generateVersions,
  generateUrlScript,
} from "./deno/generators";

const completion: Fig.Spec = {
  name: "deno",
  description: "A modern JavaScript and TypeScript runtime",
  subcommands: [
    {
      name: "bench",
      description: "Run benchmarks",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-R", "--allow-read"],
          description: "Allow file system read access",
          args: {
            name: "allow-read",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-W", "--allow-write"],
          description: "Allow file system write access",
          args: {
            name: "allow-write",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-N", "--allow-net"],
          description: "Allow network access",
          args: {
            name: "allow-net",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: ["-E", "--allow-env"],
          description: "Allow environment access",
          args: {
            name: "allow-env",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-run",
          description: "Allow running subprocesses",
          args: {
            name: "allow-run",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-ffi",
          description: "Allow loading dynamic libraries",
          args: {
            name: "allow-ffi",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--location",
          description: "Value of 'globalThis.location' used by some web APIs",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: "--v8-flags",
          description: "Set V8 command line options",
          args: {
            name: "v8-flags",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--seed",
          description: "Set the random number generator seed",
          args: {
            name: "seed",
            isOptional: true,
          },
        },
        {
          name: "--ignore",
          description: "Ignore files",
          args: {
            name: "ignore",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--filter",
          description:
            "Run benchmarks with this string or pattern in the bench name",
          args: {
            name: "filter",
            isOptional: true,
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: ["-A", "--allow-all"],
          description: "Allow all permissions",
        },
        {
          name: "--no-prompt",
          description: "Always throw if required permission wasn't passed",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: "--watch",
          description: "Watch for file changes and restart automatically",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ext",
          description:
            "Set content type of the supplied file [possible values: ts, tsx, js, jsx, mts, mjs, cts, cjs]",
        },
        {
          name: "--json",
          description: "UNSTABLE: Output benchmark result in JSON format",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-run",
          description: "Cache bench modules, but don't run benchmarks",
        },
        {
          name: "--permit-no-files",
          description: "Don't return an error code if no files were found",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
      ],
      args: [
        {
          name: "files",
          isVariadic: true,
          isOptional: true,
          template: "filepaths",
        },
        {
          name: "script_arg",
          isVariadic: true,
          isOptional: true,
          template: "filepaths",
        },
      ],
    },
    {
      name: "bundle",
      description: "Bundle module and dependencies into single file",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: "--watch",
          description: "Watch for file changes and restart automatically",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            "Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443",
        },
        { name: ["-o", "--output"], description: "Output path`" },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        { name: "--code-splitting", description: "Enable code splitting" },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--deny-import",
          description:
            "Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        { name: "--external", description: "--external" },
        { name: "--format", description: "[default: esm]" },
        {
          name: "--inline-imports",
          description:
            "Whether to inline imported modules into the importing file [default: true] [default: true] [possible values: true, false]",
        },
        { name: "--keep-names", description: "Keep function and class names" },
        { name: "--minify", description: "Minify the output" },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        { name: "--outdir", description: "Output directory for bundled files" },
        {
          name: "--packages",
          description:
            "How to handle packages. Accepted values are 'bundle' or 'external' [default: bundle]",
        },
        {
          name: "--platform",
          description:
            "Platform to bundle for. Accepted values are 'browser' or 'deno' [default: deno]",
        },
        {
          name: "--sourcemap",
          description:
            "Generate source map. Accepted values are 'linked', 'inline', or 'external'",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--declaration",
          description: "Generate .d.ts declaration files alongside the bundle",
        },
      ],
      args: [
        {
          name: "source_file",
          template: "filepaths",
        },
        {
          name: "out_file",
          isOptional: true,
          template: "filepaths",
        },
      ],
    },
    {
      name: "cache",
      description: "Cache the dependencies",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            "Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443",
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--deny-import",
          description:
            "Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
      ],
      args: {
        name: "file",
        isVariadic: true,
        template: "filepaths",
      },
    },
    {
      name: "check",
      description: "Type-check the dependencies",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            "Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443",
        },
        {
          name: "--all",
          description:
            "Type-check all code, including remote modules and npm packages",
        },
        {
          name: "--check-js",
          description:
            "Enable type-checking of JavaScript files (equivalent to `compilerOptions.checkJs: true`)",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--deny-import",
          description:
            "Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary",
        },
        {
          name: "--doc",
          description: "Type-check code blocks in JSDoc as well as actual code",
        },
        {
          name: "--doc-only",
          description: "Type-check code blocks in JSDoc and Markdown only",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-code-cache",
          description: "Disable V8 code cache feature",
        },
        {
          name: "--v8-flags",
          description:
            "To see a list of all available flags use --v8-flags=--help Flags can also be set via the DENO_V8_FLAGS environment variable. Any flags set with this flag are appended after the DENO_V8_FLAGS environment variable",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: "--watch",
          description:
            "Watch for file changes and restart process automatically. Only local files from entry point module graph are watched",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
      ],
      args: {
        name: "file",
        isVariadic: true,
        template: "filepaths",
      },
    },
    {
      name: "compile",
      description:
        "UNSTABLE: Compile the script into a self contained executable",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-R", "--allow-read"],
          description: "Allow file system read access",
          args: {
            name: "allow-read",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-W", "--allow-write"],
          description: "Allow file system write access",
          args: {
            name: "allow-write",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-N", "--allow-net"],
          description: "Allow network access",
          args: {
            name: "allow-net",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: ["-E", "--allow-env"],
          description: "Allow environment access",
          args: {
            name: "allow-env",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-run",
          description: "Allow running subprocesses",
          args: {
            name: "allow-run",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-ffi",
          description: "Allow loading dynamic libraries",
          args: {
            name: "allow-ffi",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--location",
          description: "Value of 'globalThis.location' used by some web APIs",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: "--v8-flags",
          description: "Set V8 command line options",
          args: {
            name: "v8-flags",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--seed",
          description: "Set the random number generator seed",
          args: {
            name: "seed",
            isOptional: true,
          },
        },
        {
          name: ["-o", "--output"],
          description: "Output file (defaults to $PWD/<inferred-name>)",
          args: {
            name: "output",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--target",
          description: "Target OS architecture",
          args: {
            name: "target",
            isOptional: true,
            suggestions: [
              "x86_64-unknown-linux-gnu",
              "x86_64-pc-windows-msvc",
              "x86_64-apple-darwin",
              "aarch64-apple-darwin",
            ],
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: ["-A", "--allow-all"],
          description: "Allow all permissions",
        },
        {
          name: "--no-prompt",
          description: "Always throw if required permission wasn't passed",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ext",
          description:
            "Set content type of the supplied file [possible values: ts, tsx, js, jsx, mts, mjs, cts, cjs]",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-code-cache",
          description: "Disable V8 code cache feature",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        {
          name: "--bundle",
          description:
            "Experimental. Bundle the entrypoint with esbuild before embedding, instead of shipping the whole node_modules tree. Produces a smaller binary with faster startup, at the cost of dropping dynamic require/import patterns that can't be statically traced",
        },
        {
          name: "--exclude",
          description:
            "Excludes a file/directory in the compiled executable. Use this flag to exclude a specific file or directory within the included files. For example, to exclude a certain folder in the bundled node_modules directory",
        },
        {
          name: "--exclude-unused-npm",
          description:
            "Embed only the npm packages reachable from the module graph (managed npm; no node_modules directory). Without this flag the full managed npm snapshot from the lockfile / package.json is embedded. Reduces binary size when the lockfile contains packages the entrypoint does not import. Skips packages that are only reached through non-statically-analyzable dynamic imports; pass those with --include npm:<pkg> if needed",
        },
        {
          name: "--icon",
          description: "Set the icon of the executable on Windows (.ico)",
        },
        {
          name: "--include",
          description:
            "Includes an additional module or file/directory in the compiled executable. Use this flag if a dynamically imported module or a web worker main module fails to load in the executable or to embed a file or directory in the executable. This flag can be passed multiple times, to include multiple additional modules",
        },
        {
          name: "--minify",
          description:
            "Experimental. Minify the bundled output. Only meaningful with --bundle. Reduces both the embedded bundle size and runtime memory use, at the cost of less readable stack traces",
        },
        { name: "--no-terminal", description: "Hide terminal on Windows" },
        {
          name: "--self-extracting",
          description:
            "Create a self-extracting binary that extracts the embedded file system to disk on first run and then runs from there",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: "--watch",
          description:
            "Watch for file changes and restart process automatically. Only local files from entry point module graph are watched",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
        {
          name: "--app-name",
          description:
            "Stable identity for the compiled app. Determines where origin-bound storage such as the default `Deno.openKv()`, `localStorage` and `caches` is persisted (under the platform's app data directory). Defaults to the output file name. Set this to keep storage stable across renames",
        },
      ],
      args: {
        name: "script_arg",
        isVariadic: true,
        isScript: true,
        generators: [{ template: "filepaths" }, generateUrlScript],
      },
      parserDirectives: {
        optionsMustPrecedeArguments: true,
      },
    },
    {
      name: "completions",
      description: "Generate shell completions",
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: "--dynamic",
          description:
            "Generate dynamic completions for the given shell (unstable), currently this only provides available tasks for `deno task`",
        },
      ],
      args: {
        name: "shell",
        suggestions: ["bash", "fish", "powershell", "zsh", "fig"],
      },
    },
    {
      name: "coverage",
      description: "Print coverage reports",
      options: [
        {
          name: "--ignore",
          description: "Ignore coverage files",
          args: {
            name: "ignore",
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--include",
          description: "Include source files in the report",
          isRepeatable: true,
          args: {
            name: "include",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--exclude",
          description: "Exclude source files from the report",
          isRepeatable: true,
          args: {
            name: "exclude",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--output",
          description: "Output file (defaults to stdout) for lcov",
          args: {
            name: "output",
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lcov",
          description: "Output coverage report in lcov format",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: "--detailed",
          description:
            "Output coverage report in detailed format in the terminal",
        },
        {
          name: "--html",
          description:
            "Output coverage report in HTML format in the given directory",
        },
        {
          name: "--threshold",
          description:
            'Fail if coverage is below this percentage (0-100), applied to line, branch, and function coverage. Per-metric thresholds can be set in deno.json under "coverage": { "thresholds": { ... } }. The flag takes precedence',
        },
      ],
      args: {
        name: "files",
        isVariadic: true,
        template: "filepaths",
      },
    },
    {
      name: "doc",
      description: "Show documentation for a module",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--json",
          description: "Output documentation in JSON format",
        },
        {
          name: "--private",
          description: "Output private documentation",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            "Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443",
        },
        {
          name: "--deny-import",
          description:
            "Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--category-docs",
          description:
            "Path to a JSON file keyed by category and an optional value of a markdown doc",
        },
        {
          name: "--default-symbol-map",
          description:
            "Uses the provided mapping of default name to wanted name for usage blocks",
        },
        { name: "--filter", description: "Dot separated path to symbol" },
        { name: "--html", description: "Output documentation in HTML format" },
        { name: "--lint", description: "Output documentation diagnostics" },
        {
          name: "--name",
          description:
            "The name that will be used in the docs (ie for breadcrumbs)",
        },
        {
          name: "--output",
          description: "Directory for HTML documentation output",
        },
        {
          name: "--strip-trailing-html",
          description:
            "Remove trailing .html from various links. Will still generate files with a .html extension",
        },
        {
          name: "--symbol-redirect-map",
          description:
            "Path to a JSON file keyed by file, with an inner map of symbol to an external link",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        { name: "--no-remote", description: "Do not resolve remote modules" },
      ],
      args: [
        {
          name: "source_file",
          isOptional: true,
          generators: [{ template: "filepaths" }, generateUrlScript],
          suggestions: [
            {
              name: "--builtin",
              description: "Get documentation for built-in symbols",
              icon: "fig://icon?type=option",
              type: "option",
            },
          ],
        },
        {
          name: "filter",
          isOptional: true,
          generators: generateDocs,
        },
      ],
    },
    {
      name: "eval",
      description: "Eval script",
      insertValue: "eval '{cursor}'",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port (default: 127.0.0.1:9229)",
          args: {
            name: "inspect",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port and break at start of user script",
          args: {
            name: "inspect-brk",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--location",
          description: "Value of 'globalThis.location' used by some web APIs",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: "--v8-flags",
          description: "Set V8 command line options",
          args: {
            name: "v8-flags",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--seed",
          description: "Set the random number generator seed",
          args: {
            name: "seed",
            isOptional: true,
          },
        },
        {
          name: "--ext",
          description: "Set standard input (stdin) content type",
          args: {
            name: "ext",
            isOptional: true,
            suggestions: ["ts", "tsx", "js", "jsx"],
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: ["-p", "--print"],
          description: "Print result to stdout",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--cpu-prof",
          description:
            "Start the V8 CPU profiler on startup and write the profile to disk on exit. Profiles are written to the current directory by default",
        },
        {
          name: "--cpu-prof-dir",
          description:
            "Directory where the V8 CPU profiles will be written. Implicitly enables --cpu-prof",
        },
        {
          name: "--cpu-prof-flamegraph",
          description: "Generate an SVG flamegraph alongside the CPU profile",
        },
        {
          name: "--cpu-prof-interval",
          description: "Sampling interval in microseconds for CPU profiling",
        },
        {
          name: "--cpu-prof-md",
          description:
            "Generate a human-readable markdown report alongside the CPU profile",
        },
        {
          name: "--cpu-prof-name",
          description:
            "Filename for the CPU profile (defaults to CPU.<timestamp>.<pid>.cpuprofile)",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
      ],
      args: {
        name: "code_arg",
        isVariadic: true,
      },
    },
    {
      name: "fmt",
      description: "Format source files",
      options: [
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--ext",
          description: "Set standard input (stdin) content type",
          args: {
            name: "ext",
            isOptional: true,
            suggestions: ["ts", "tsx", "js", "jsx", "md", "json", "jsonc"],
          },
        },
        {
          name: "--ignore",
          description: "Ignore formatting particular source files",
          args: {
            name: "ignore",
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: "--check",
          description: "Check if the source files are formatted",
        },
        {
          name: "--watch",
          description: "Watch for file changes and restart automatically",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: "--permit-no-files",
          description: "Don't return an error code if no files were found",
        },
        {
          name: "--fail-fast",
          description: "Stop checking files on first format error",
        },
        {
          name: "--indent-width",
          description: "Define indentation width [default: 2]",
        },
        {
          name: "--line-width",
          description: "Define maximum line width [default: 80]",
        },
        {
          name: "--no-semicolons",
          description:
            "Don't use semicolons except where necessary [default: false] [possible values: true, false]",
        },
        {
          name: "--prose-wrap",
          description:
            "Define how prose should be wrapped [default: always] [possible values: always, never, preserve]",
        },
        {
          name: "--single-quote",
          description:
            "Use single quotes [default: false] [possible values: true, false]",
        },
        {
          name: "--unstable-component",
          description: "Enable formatting Svelte, Vue, Astro and Angular files",
        },
        { name: "--unstable-sql", description: "Enable formatting SQL files" },
        {
          name: "--use-tabs",
          description:
            "Use tabs instead of spaces for indentation [default: false] [possible values: true, false]",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--no-editorconfig",
          description:
            "Don't read .editorconfig files to infer formatting options [default: false]",
        },
      ],
      args: {
        name: "files",
        isVariadic: true,
        isOptional: true,
        template: "filepaths",
        suggestions: [
          { name: "-", description: "Read from standard input", hidden: true },
        ],
      },
    },
    {
      name: "init",
      description: "Initialize a new project",
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-y", "--yes"],
          description: "Bypass the prompt and run with full permissions",
        },
        {
          name: "--empty",
          description:
            "Generate a minimal project with just main.ts and deno.json",
        },
        { name: "--jsr", description: "Generate a project from a JSR package" },
        { name: "--lib", description: "Generate an example library project" },
        { name: "--npm", description: "Generate a npm create-* project" },
        {
          name: "--serve",
          description: "Generate an example project for `deno serve`",
        },
      ],
      args: {
        name: "dir",
        isOptional: true,
        template: "folders",
      },
    },
    {
      name: "info",
      description: "Show info about cache or info related to source file",
      options: [
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--location",
          description:
            "Show files used for origin bound APIs like the Web Storage API when running a script with '--location=<HREF>'",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: "--json",
          description: "UNSTABLE: Outputs the information in JSON format",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            "Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443",
        },
        {
          name: "--deny-import",
          description:
            "Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        { name: "--no-remote", description: "Do not resolve remote modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
      ],
      args: {
        name: "file",
        isOptional: true,
        template: "filepaths",
      },
    },
    {
      name: "install",
      description: "Install script as an executable",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-R", "--allow-read"],
          description: "Allow file system read access",
          args: {
            name: "allow-read",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-W", "--allow-write"],
          description: "Allow file system write access",
          args: {
            name: "allow-write",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-N", "--allow-net"],
          description: "Allow network access",
          args: {
            name: "allow-net",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: ["-E", "--allow-env"],
          description: "Allow environment access",
          args: {
            name: "allow-env",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-run",
          description: "Allow running subprocesses",
          args: {
            name: "allow-run",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-ffi",
          description: "Allow loading dynamic libraries",
          args: {
            name: "allow-ffi",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port (default: 127.0.0.1:9229)",
          args: {
            name: "inspect",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port and break at start of user script",
          args: {
            name: "inspect-brk",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--location",
          description: "Value of 'globalThis.location' used by some web APIs",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: "--v8-flags",
          description: "Set V8 command line options",
          args: {
            name: "v8-flags",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--seed",
          description: "Set the random number generator seed",
          args: {
            name: "seed",
            isOptional: true,
          },
        },
        {
          name: ["-n", "--name"],
          description: "Executable file name",
          args: {
            name: "name",
            isOptional: true,
          },
        },
        {
          name: "--root",
          description: "Installation root",
          args: {
            name: "root",
            isOptional: true,
            template: "folders",
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: ["-A", "--allow-all"],
          description: "Allow all permissions",
        },
        {
          name: "--no-prompt",
          description: "Always throw if required permission wasn't passed",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: ["-f", "--force"],
          description: "Forcefully overwrite existing installation",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-D", "--dev"],
          description:
            "Add the package as a dev dependency. Note: This only applies when adding to a `package.json` file",
        },
        {
          name: ["-e", "--entrypoint"],
          description: "Install dependents of the specified entrypoint(s)",
        },
        {
          name: ["-g", "--global"],
          description:
            "Install a package or script as a globally available executable",
        },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--arch",
          description:
            "Target architecture for npm package installation (e.g., x64, arm64) [possible values: arm, arm64, ia32, mips, mipsel, ppc, ppc64, s390, s390x, x64]",
        },
        {
          name: "--compile",
          description: "Install the script as a compiled executable",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--jsr",
          description: "Assume unprefixed package names are jsr packages",
        },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--npm",
          description:
            "Assume unprefixed package names are npm packages (default)",
        },
        {
          name: "--os",
          description:
            "Target OS for npm package installation (e.g., linux, darwin, win32) [possible values: aix, android, darwin, freebsd, linux, openbsd, sunos, win32]",
        },
        {
          name: "--package-json",
          description:
            "Force using package.json for dependency management instead of deno.json",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--prod",
          description:
            "Only install production dependencies (excludes devDependencies)",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        {
          name: "--save-exact",
          description: "Save exact version without the caret (^)",
        },
        {
          name: "--skip-types",
          description:
            "Exclude @types/* packages from installation. Be careful, as it uses a name-based heuristic and may skip packages that ship runtime code",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
      ],
      args: {
        name: "cmd",
        isVariadic: true,
        isScript: true,
        generators: [{ template: "filepaths" }, generateUrlScript],
      },
      parserDirectives: {
        optionsMustPrecedeArguments: true,
      },
    },
    {
      name: "uninstall",
      description: "Uninstall a script previously installed with deno install",
      options: [
        {
          name: "--root",
          description: "Installation root",
          args: {
            name: "root",
            isOptional: true,
            template: "folders",
          },
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-g", "--global"],
          description: "Remove globally installed package or module",
        },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--package-json",
          description:
            "Force using package.json for dependency management instead of deno.json",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
      ],
      args: {
        name: "name",
        generators: generateInstalledDenoScripts,
      },
    },
    {
      name: "lsp",
      description: "Start the language server",
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
      ],
    },
    {
      name: "lint",
      description: "Lint source files",
      options: [
        {
          name: "--rules-tags",
          description: "Use set of rules with a tag",
          exclusiveOn: ["--rules"],
          args: {
            name: "rules-tags",
            isOptional: true,
            generators: generateLintRules,
          },
          requiresSeparator: true,
        },
        {
          name: "--rules-include",
          description: "Include lint rules",
          exclusiveOn: ["--rules"],
          args: {
            name: "rules-include",
            isOptional: true,
            generators: generateLintRules,
          },
          requiresSeparator: true,
        },
        {
          name: "--rules-exclude",
          description: "Exclude lint rules",
          exclusiveOn: ["--rules"],
          args: {
            name: "rules-exclude",
            isOptional: true,
            generators: generateLintRules,
          },
          requiresSeparator: true,
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--ignore",
          description: "Ignore linting particular source files",
          args: {
            name: "ignore",
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--rules",
          description: "List available rules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: "--json",
          description: "Output lint result in JSON format",
        },
        {
          name: "--watch",
          description: "Watch for file changes and restart automatically",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            "Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443",
        },
        {
          name: "--deny-import",
          description:
            "Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary",
        },
        {
          name: "--ext",
          description:
            "Specify the file extension to lint when reading from stdin.For example, use `jsx` to lint JSX files or `tsx` for TSX files.This argument is necessary because stdin input does not automatically infer the file type.Example usage: `cat file.jsx | deno lint - --ext=jsx`",
        },
        {
          name: "--permit-no-files",
          description: "Don't return an error code if no files were found",
        },
        {
          name: "--compact",
          description: "Output lint result in compact format",
        },
        {
          name: "--fix",
          description: "Fix any linting errors for rules that support it",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
      ],
      args: {
        name: "files",
        isVariadic: true,
        isOptional: true,
        template: "filepaths",
      },
    },
    {
      name: "repl",
      description: "Read Eval Print Loop",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port (default: 127.0.0.1:9229)",
          args: {
            name: "inspect",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port and break at start of user script",
          args: {
            name: "inspect-brk",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--location",
          description: "Value of 'globalThis.location' used by some web APIs",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: "--v8-flags",
          description: "Set V8 command line options",
          args: {
            name: "v8-flags",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--seed",
          description: "Set the random number generator seed",
          args: {
            name: "seed",
            isOptional: true,
          },
        },
        {
          name: "--eval-file",
          description:
            "Evaluates the provided file(s) as scripts when the REPL starts. Accepts file paths and URLs",
          args: {
            name: "eval-file",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--eval",
          description: "Evaluates the provided code when the REPL starts",
          args: {
            name: "eval",
            isOptional: true,
          },
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
      ],
    },
    {
      name: "run",
      description: "Run a JavaScript or TypeScript program",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-R", "--allow-read"],
          description: "Allow file system read access",
          args: {
            name: "allow-read",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-W", "--allow-write"],
          description: "Allow file system write access",
          args: {
            name: "allow-write",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-N", "--allow-net"],
          description: "Allow network access",
          args: {
            name: "allow-net",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: ["-E", "--allow-env"],
          description: "Allow environment access",
          args: {
            name: "allow-env",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-run",
          description: "Allow running subprocesses",
          args: {
            name: "allow-run",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-ffi",
          description: "Allow loading dynamic libraries",
          args: {
            name: "allow-ffi",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port (default: 127.0.0.1:9229)",
          args: {
            name: "inspect",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port and break at start of user script",
          args: {
            name: "inspect-brk",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--location",
          description: "Value of 'globalThis.location' used by some web APIs",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: "--v8-flags",
          description: "Set V8 command line options",
          args: {
            name: "v8-flags",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--seed",
          description: "Set the random number generator seed",
          args: {
            name: "seed",
            isOptional: true,
          },
        },
        {
          name: "--watch",
          description: "Watch for file changes and restart automatically",
          exclusiveOn: ["--inspect", "--inspect-brk"],
          args: {
            name: "watch",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
            generators: {
              template: "filepaths",
              getQueryTerm: ",",
            },
          },
          requiresSeparator: true,
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: ["-A", "--allow-all"],
          description: "Allow all permissions",
        },
        {
          name: "--no-prompt",
          description: "Always throw if required permission wasn't passed",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-t", "--tunnel"],
          description: "Execute tasks with a tunnel to Deno Deploy",
        },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--coverage",
          description:
            "Collect coverage profile data into DIR. If DIR is not specified, it uses 'coverage/'. This option can also be set via the DENO_COVERAGE_DIR environment variable",
        },
        {
          name: "--cpu-prof",
          description:
            "Start the V8 CPU profiler on startup and write the profile to disk on exit. Profiles are written to the current directory by default",
        },
        {
          name: "--cpu-prof-dir",
          description:
            "Directory where the V8 CPU profiles will be written. Implicitly enables --cpu-prof",
        },
        {
          name: "--cpu-prof-flamegraph",
          description: "Generate an SVG flamegraph alongside the CPU profile",
        },
        {
          name: "--cpu-prof-interval",
          description: "Sampling interval in microseconds for CPU profiling",
        },
        {
          name: "--cpu-prof-md",
          description:
            "Generate a human-readable markdown report alongside the CPU profile",
        },
        {
          name: "--cpu-prof-name",
          description:
            "Filename for the CPU profile (defaults to CPU.<timestamp>.<pid>.cpuprofile)",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ext",
          description:
            "Set content type of the supplied file [possible values: ts, tsx, js, jsx, mts, mjs, cts, cjs]",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-code-cache",
          description: "Disable V8 code cache feature",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        {
          name: "--use-env-proxy",
          description:
            "Use HTTP_PROXY, HTTPS_PROXY, and NO_PROXY for node:http/node:https",
        },
        {
          name: "--watch-hmr",
          description:
            "Watch for file changes and hot-replace modules. The process restarts if hot replacement fails. Local files from entry point module graph are watched by default. Additional paths might be watched by passing them as arguments to this flag",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
      ],
      args: {
        name: "script_arg",
        isVariadic: true,
        isScript: true,
        suggestions: [
          {
            name: "-",
            description: "Read from standard input",
            hidden: true,
          },
        ],
        generators: [{ template: "filepaths" }, generateUrlScript],
      },
      parserDirectives: {
        optionsMustPrecedeArguments: true,
      },
    },
    {
      name: "task",
      description: "Run a task defined in the configuration file",
      options: [
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cwd",
          description: "Specify the directory to run the task in",
          args: {
            name: "cwd",
            isOptional: true,
            template: "folders",
          },
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-f", "--filter"],
          description:
            "Filter members of the workspace by name, implies --recursive flag",
        },
        {
          name: ["-r", "--recursive"],
          description: "Run the task in all projects in the workspace",
        },
        {
          name: ["-t", "--tunnel"],
          description: "Execute tasks with a tunnel to Deno Deploy",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--eval",
          description:
            "Evaluate the passed value as if it was a task in a configuration file",
        },
        {
          name: "--no-prefix",
          description:
            "Disable prefixing the output of concurrently-executing tasks with the task name",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: ["-j", "--jobs"],
          description:
            "Maximum number of tasks to run concurrently. Overrides the DENO_JOBS environment variable; defaults to the number of available CPUs. Use 1 to force sequential execution. Only affects runs where multiple tasks can run concurrently (workspace runs, or a task with parallelizable dependencies) [aliases: --concurrency]",
        },
        {
          name: "--if-present",
          description:
            "Exit with code 0 instead of an error when the task is not found",
        },
      ],
      args: [
        {
          name: "task_name",
          generators: generateTasks,
        },
        {
          name: "task_args",
          isVariadic: true,
          isOptional: true,
        },
      ],
      parserDirectives: {
        optionsMustPrecedeArguments: true,
      },
    },
    {
      name: "test",
      description: "Run tests",
      options: [
        {
          name: "--import-map",
          description: "Load import map file",
          args: {
            name: "import-map",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-c", "--config"],
          description: "Specify the configuration file",
          args: {
            name: "config",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--no-check",
          description: "Skip type-checking modules",
          args: {
            name: "no-check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["remote"],
          },
          requiresSeparator: true,
        },
        {
          name: "--check",
          description: "Type-check modules",
          exclusiveOn: ["--no-check"],
          args: {
            name: "check",
            isVariadic: true,
            isOptional: true,
            suggestions: ["all"],
          },
          requiresSeparator: true,
        },
        {
          name: ["-r", "--reload"],
          description: "Reload source code cache (recompile TypeScript)",
          args: {
            name: "reload",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--lock",
          description: "Check the specified lock file",
          args: {
            name: "lock",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: ["-R", "--allow-read"],
          description: "Allow file system read access",
          args: {
            name: "allow-read",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-W", "--allow-write"],
          description: "Allow file system write access",
          args: {
            name: "allow-write",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: ["-N", "--allow-net"],
          description: "Allow network access",
          args: {
            name: "allow-net",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: ["-E", "--allow-env"],
          description: "Allow environment access",
          args: {
            name: "allow-env",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-run",
          description: "Allow running subprocesses",
          args: {
            name: "allow-run",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--allow-ffi",
          description: "Allow loading dynamic libraries",
          args: {
            name: "allow-ffi",
            isVariadic: true,
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port (default: 127.0.0.1:9229)",
          args: {
            name: "inspect",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port and break at start of user script",
          args: {
            name: "inspect-brk",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--location",
          description: "Value of 'globalThis.location' used by some web APIs",
          args: {
            name: "location",
            isOptional: true,
          },
        },
        {
          name: "--v8-flags",
          description: "Set V8 command line options",
          args: {
            name: "v8-flags",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--seed",
          description: "Set the random number generator seed",
          args: {
            name: "seed",
            isOptional: true,
          },
        },
        {
          name: "--ignore",
          description: "Ignore files",
          args: {
            name: "ignore",
            isOptional: true,
            template: "filepaths",
          },
          requiresSeparator: true,
        },
        {
          name: "--fail-fast",
          description:
            "Stop after N errors. Defaults to stopping after first failure",
          args: {
            name: "fail-fast",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--filter",
          description: "Run tests with this string or pattern in the test name",
          args: {
            name: "filter",
            isOptional: true,
          },
        },
        {
          name: "--shuffle",
          description:
            "(UNSTABLE): Shuffle the order in which the tests are run",
          args: {
            name: "shuffle",
            isVariadic: true,
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--coverage",
          description: "UNSTABLE: Collect coverage profile data into DIR",
          exclusiveOn: ["--inspect", "--inspect-brk"],
          args: {
            name: "coverage",
            isOptional: true,
          },
          requiresSeparator: true,
        },
        {
          name: "--no-remote",
          description: "Do not resolve remote modules",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
          exclusiveOn: ["-c", "--config"],
        },
        {
          name: ["-A", "--allow-all"],
          description: "Allow all permissions",
        },
        {
          name: "--no-prompt",
          description: "Always throw if required permission wasn't passed",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: "--no-run",
          description: "Cache test modules, but don't run tests",
        },
        {
          name: "--doc",
          description: "UNSTABLE: type-check code blocks",
        },
        {
          name: "--parallel",
          description:
            "Run test modules in parallel. Parallelism defaults to the number of available CPUs or the value in the DENO_JOBS environment variable",
          exclusiveOn: ["-j", "--jobs"],
        },
        {
          name: "--watch",
          description: "Watch for file changes and restart automatically",
          exclusiveOn: ["--no-run", "--coverage"],
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: "--unstable",
          description: "Enable unstable features and APIs",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ext",
          description:
            "Set content type of the supplied file [possible values: ts, tsx, js, jsx, mts, mjs, cts, cjs]",
        },
        {
          name: "--hide-stacktraces",
          description: "Hide stack traces for errors in failure test results",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        {
          name: "--clean",
          description:
            "Empty the temporary coverage profile data directory before running tests. Note: running multiple `deno test --clean` calls in series or parallel for the same coverage directory may cause race conditions",
        },
        {
          name: "--coverage-raw-data-only",
          description:
            "Only collect raw coverage data, without generating a report",
        },
        {
          name: "--junit-path",
          description:
            "Write a JUnit XML test report to PATH. Use '-' to write to stdout which is the default when PATH is not provided",
        },
        {
          name: "--permit-no-files",
          description: "Don't return an error code if no files were found",
        },
        {
          name: "--reporter",
          description:
            "Select reporter to use. Default to 'pretty' [possible values: pretty, dot, junit, tap]",
        },
        {
          name: "--sanitize-ops",
          description:
            "Enable the ops sanitizer, which ensures that all async ops started in a test are completed before the test ends",
        },
        {
          name: "--sanitize-resources",
          description:
            "Enable the resources sanitizer, which ensures that all resources opened in a test are closed before the test ends",
        },
        {
          name: "--trace-leaks",
          description:
            "Enable tracing of leaks. Useful when debugging leaking ops in test, but impacts test execution time",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
        {
          name: ["-u", "--update-snapshots"],
          description:
            "Update snapshots created with `t.assertSnapshot()` instead of failing when they do not match",
        },
        {
          name: "--changed",
          description:
            "Run only test modules affected by files changed in git. With no value, uses uncommitted changes (staged, unstaged and untracked). Pass a git ref to compare against, e.g. --changed=main or --changed=HEAD~1",
        },
        {
          name: "--coverage-threshold",
          description:
            "Fail if coverage is below this percentage (0-100). Requires --coverage",
        },
        {
          name: "--related",
          description:
            "Run only test modules that depend on the given source files",
        },
        {
          name: "--repeats",
          description:
            "Run each test NUMBER additional times. Every repetition must pass. Tests that set their own `repeats` option take precedence",
        },
        {
          name: "--retry",
          description:
            "Re-run failing tests up to NUMBER times. A test passes if any attempt passes. Tests that set their own `retry` option take precedence",
        },
        {
          name: "--shard",
          description:
            "Run only the test files for shard INDEX of COUNT, e.g. --shard=2/3. The discovered test files are sorted and split into COUNT consecutive groups; INDEX is 1-based. Useful for splitting a run across machines",
        },
      ],
      args: [
        {
          name: "files",
          isVariadic: true,
          isOptional: true,
          template: "filepaths",
        },
        {
          name: "script_arg",
          isVariadic: true,
          isOptional: true,
          template: "filepaths",
        },
      ],
    },
    {
      name: "types",
      description: "Print runtime TypeScript declarations",
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
      ],
    },
    {
      name: "upgrade",
      description: "Upgrade deno executable to given version",
      options: [
        {
          name: "--output",
          description: "The path to output the updated version to",
          args: {
            name: "output",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
          args: {
            name: "cert",
            isOptional: true,
            template: "filepaths",
          },
        },
        {
          name: "--dry-run",
          description: "Perform all checks without replacing old exe",
        },
        {
          name: ["-f", "--force"],
          description: "Replace current exe even if not out-of-date",
        },
        {
          name: ["-h", "--help"],
          description: "Print help information",
        },
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: "--checksum",
          description:
            "Verify the downloaded archive against the provided SHA256 checksum",
        },
        {
          name: "--no-delta",
          description:
            "Disable delta updates and always download the full archive",
        },
      ],
    },
    {
      name: "help",
      description: "Print this message or the help of the given subcommand(s)",
      options: [
        {
          name: ["-q", "--quiet"],
          description: "Suppress diagnostic output",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
      ],
      args: {
        name: "subcommand",
        isOptional: true,
        template: "help",
      },
    },
    {
      name: "update",
      description: "Update outdated dependencies",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        {
          name: ["-i", "--interactive"],
          description: "Interactively select which dependencies to update",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-r", "--recursive"],
          description: "Include all workspace members",
        },
        {
          name: "--compatible",
          description:
            "Only consider versions that satisfy semver requirements",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--latest",
          description:
            "Consider the latest version, regardless of semver constraints",
        },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
      ],
    },
    {
      name: "transpile",
      description: "Transpile TypeScript/JSX/TSX files to JavaScript",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Configure different aspects of deno including TypeScript, linting, and code formatting. Typically the configuration file will be called `deno.json` or `deno.jsonc` and automatically detected; in that case this flag is not necessary. Docs: https://docs.deno.com/go/config",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        {
          name: ["-o", "--output"],
          description: "Output file path (for single file transpilation)",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-r", "--reload"],
          description:
            "Reload source code cache (recompile TypeScript) no value Reload everything jsr:@std/http/file-server,jsr:@std/assert/assert-equals Reloads specific modules npm: Reload all npm modules npm:chalk Reload specific npm module",
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--declaration",
          description:
            "Generate .d.ts declaration files (requires type-checking via tsc)",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
        },
        {
          name: "--outdir",
          description: "Output directory for transpiled files",
        },
        {
          name: "--source-map",
          description:
            "Source map mode: none, inline, or separate [default: none] [possible values: none, inline, separate]",
        },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--import-map",
          description:
            "Load import map file from local file or remote URL Docs: https://docs.deno.com/runtime/manual/basics/import_maps",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        { name: "--no-remote", description: "Do not resolve remote modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
      ],
    },
    {
      name: "serve",
      description: "Run a server defined in a main module",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Configure different aspects of deno including TypeScript, linting, and code formatting. Typically the configuration file will be called `deno.json` or `deno.jsonc` and automatically detected; in that case this flag is not necessary. Docs: https://docs.deno.com/go/config",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-t", "--tunnel"],
          description: "Execute tasks with a tunnel to Deno Deploy",
        },
        {
          name: ["-r", "--reload"],
          description:
            "Reload source code cache (recompile TypeScript) no value Reload everything jsr:@std/http/file-server,jsr:@std/assert/assert-equals Reloads specific modules npm: Reload all npm modules npm:chalk Reload specific npm module",
        },
        { name: ["-A", "--allow-all"], description: "Allow all permissions" },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-R", "--allow-read"],
          description:
            'Allow file system read access. Optionally specify allowed paths. --allow-read | --allow-read="/etc,/var/log.txt"',
        },
        {
          name: ["-W", "--allow-write"],
          description:
            'Allow file system write access. Optionally specify allowed paths. --allow-write | --allow-write="/etc,/var/log.txt"',
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-N", "--allow-net"],
          description:
            'Allow network access. Optionally specify allowed IP addresses and host names, with ports as necessary. --allow-net | --allow-net="localhost:8080,deno.land"',
        },
        {
          name: ["-E", "--allow-env"],
          description:
            'Allow access to environment variables. Optionally specify accessible environment variables. --allow-env | --allow-env="PORT,HOME,PATH"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--cpu-prof",
          description:
            "Start the V8 CPU profiler on startup and write the profile to disk on exit. Profiles are written to the current directory by default",
        },
        {
          name: "--cpu-prof-dir",
          description:
            "Directory where the V8 CPU profiles will be written. Implicitly enables --cpu-prof",
        },
        {
          name: "--cpu-prof-flamegraph",
          description: "Generate an SVG flamegraph alongside the CPU profile",
        },
        {
          name: "--cpu-prof-interval",
          description: "Sampling interval in microseconds for CPU profiling",
        },
        {
          name: "--cpu-prof-md",
          description:
            "Generate a human-readable markdown report alongside the CPU profile",
        },
        {
          name: "--cpu-prof-name",
          description:
            "Filename for the CPU profile (defaults to CPU.<timestamp>.<pid>.cpuprofile)",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ext",
          description:
            "Set content type of the supplied file [possible values: ts, tsx, js, jsx, mts, mjs, cts, cjs]",
        },
        {
          name: "--host",
          description:
            "The TCP address to serve on, defaulting to 0.0.0.0 (all interfaces)",
        },
        {
          name: "--location",
          description: "Value of globalThis.location used by some web APIs",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-code-cache",
          description: "Disable V8 code cache feature",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
        },
        {
          name: "--open",
          description:
            "Open the browser on the address that the server is running on",
        },
        {
          name: "--parallel",
          description:
            "Run multiple server workers in parallel. Parallelism defaults to the number of available CPUs or the value of the DENO_JOBS environment variable",
        },
        {
          name: "--port",
          description:
            "The TCP port to serve on. Pass 0 to pick a random free port [default: 8000]",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        { name: "--seed", description: "Set the random number generator seed" },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
        {
          name: "--v8-flags",
          description:
            "To see a list of all available flags use --v8-flags=--help Flags can also be set via the DENO_V8_FLAGS environment variable. Any flags set with this flag are appended after the DENO_V8_FLAGS environment variable",
        },
        {
          name: "--check",
          description:
            "Enable type-checking. This subcommand does not type-check by default If the value of \"all\" is supplied, remote modules will be included. Alternatively, the 'deno check' subcommand can be used",
        },
        {
          name: "--no-check",
          description:
            'Skip type-checking. If the value of "remote" is supplied, diagnostic errors from remote modules will be ignored',
        },
        {
          name: "--watch-hmr",
          description:
            "Watch for file changes and hot-replace modules. The process restarts if hot replacement fails. Local files from entry point module graph are watched by default. Additional paths might be watched by passing them as arguments to this flag",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: "--watch",
          description:
            "Watch for file changes and restart process automatically. Local files from entry point module graph are watched by default. Additional paths might be watched by passing them as arguments to this flag",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port [default: 127.0.0.1:9229]. Host and port are optional. Using port 0 will assign a random free port",
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port, wait for debugger to connect and break at the start of user script",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--import-map",
          description:
            "Load import map file from local file or remote URL Docs: https://docs.deno.com/runtime/manual/basics/import_maps",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        { name: "--no-remote", description: "Do not resolve remote modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--no-prompt",
          description:
            "Always throw if required permission wasn't passed. Can also be set via the DENO_NO_PROMPT environment variable",
        },
        {
          name: "--allow-run",
          description:
            'Allow running subprocesses. Optionally specify allowed runnable program names. --allow-run | --allow-run="whoami,ps"',
        },
        {
          name: "--allow-ffi",
          description:
            '(Unstable) Allow loading dynamic libraries. Optionally specify allowed directories or files. --allow-ffi | --allow-ffi="./libfoo.so"',
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
      ],
    },
    {
      name: "remove",
      description: "Remove dependencies from the configuration file",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--package-json",
          description:
            "Force using package.json for dependency management instead of deno.json",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        {
          name: ["-g", "--global"],
          description: "Remove globally installed package or module",
        },
        { name: "--root", description: "Installation root" },
      ],
    },
    {
      name: "publish",
      description:
        "Publish the current working directory's package or workspace to JSR",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Configure different aspects of deno including TypeScript, linting, and code formatting. Typically the configuration file will be called `deno.json` or `deno.jsonc` and automatically detected; in that case this flag is not necessary. Docs: https://docs.deno.com/go/config",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
        },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
        {
          name: "--allow-dirty",
          description:
            "Allow publishing if the repository has uncommitted changed",
        },
        {
          name: "--allow-slow-types",
          description: "Allow publishing with slow types",
        },
        {
          name: "--dry-run",
          description:
            "Prepare the package for publishing performing all checks and validations without uploading",
        },
        {
          name: "--no-provenance",
          description:
            "Disable provenance attestation. Enabled by default on Github actions, publicly links the package to where it was built and published from",
        },
        {
          name: "--set-version",
          description:
            "Set version for a package to be published. This flag can be used while publishing individual packages and cannot be used in a workspace",
        },
        {
          name: "--token",
          description:
            "The API token to use when publishing. If unset, interactive authentication is be used",
        },
        {
          name: "--check",
          description:
            "Set type-checking behavior. This subcommand type-checks local modules by default, so adding --check is redundant If the value of \"all\" is supplied, remote modules will be included. Alternatively, the 'deno check' subcommand can be used",
        },
        {
          name: "--no-check",
          description:
            'Skip type-checking. If the value of "remote" is supplied, diagnostic errors from remote modules will be ignored',
        },
      ],
    },
    {
      name: "pack",
      description: "Create an npm-compatible tarball from a Deno project",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Configure different aspects of deno including TypeScript, linting, and code formatting. Typically the configuration file will be called `deno.json` or `deno.jsonc` and automatically detected; in that case this flag is not necessary. Docs: https://docs.deno.com/go/config",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        {
          name: ["-o", "--output"],
          description: "Output file path (defaults to <name>-<version>.tgz)",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--allow-dirty",
          description:
            "Allow packing if the repository has uncommitted changes",
        },
        {
          name: "--allow-slow-types",
          description:
            "Skip fast-check type extraction; .d.ts files are omitted from the output",
        },
        {
          name: "--dry-run",
          description: "Show what would be packed without creating the tarball",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ignore",
          description: "Ignore files matching these patterns",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
        },
        {
          name: "--no-source-maps",
          description: "Don't include source maps in the output",
        },
        {
          name: "--set-version",
          description: "Override the version in the tarball",
        },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
      ],
    },
    {
      name: "outdated",
      description: "Find and update outdated dependencies",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        {
          name: ["-i", "--interactive"],
          description: "Interactively select which dependencies to update",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-r", "--recursive"],
          description: "Include all workspace members",
        },
        { name: ["-u", "--update"], description: "Update dependency versions" },
        {
          name: "--compatible",
          description:
            "Only consider versions that satisfy semver requirements",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--latest",
          description:
            "Consider the latest version, regardless of semver constraints",
        },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
      ],
    },
    {
      name: "jupyter",
      description: "Deno kernel for Jupyter notebooks",
      options: [
        {
          name: ["-d", "--display"],
          description:
            "Set a display name for the kernel (defaults to 'Deno'). Useful when maintaing multiple Deno kernels",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        {
          name: ["-n", "--name"],
          description:
            "Set a name for the kernel (defaults to 'deno'). Useful when maintaing multiple Deno kernels",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--conn",
          description:
            "Path to JSON file describing connection parameters, provided by Jupyter",
        },
        {
          name: "--force",
          description:
            "Force installation of a kernel, overwriting previously existing kernelspec",
        },
        { name: "--install", description: "Install a kernelspec" },
        { name: "--kernel", description: "Start the kernel" },
      ],
    },
    {
      name: "json_reference",
      description: "Options:",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
      ],
    },
    {
      name: "create",
      description: "Scaffolds a project from a package",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-y", "--yes"],
          description: "Bypass the prompt and run with full permissions",
        },
        {
          name: "--jsr",
          description: "Treat unprefixed package names as JSR packages",
        },
        {
          name: "--npm",
          description: "Treat unprefixed package names as npm packages",
        },
      ],
    },
    {
      name: "clean",
      description: "Remove the cache directory ($DENO_DIR)",
      options: [
        {
          name: ["-e", "--except"],
          description: "Retain cache data needed by the given files",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--dry-run",
          description:
            "Show what would be removed without performing any actions",
        },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
      ],
    },
    {
      name: "ci",
      description:
        "Install dependencies in a clean, reproducible way for CI environments",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--prod",
          description:
            "Only install production dependencies (excludes devDependencies)",
        },
        {
          name: "--skip-types",
          description:
            "Exclude @types/* packages from installation. Be careful, as it uses a name-based heuristic and may skip packages that ship runtime code",
        },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
      ],
    },
    {
      name: "bump-version",
      description: "Update version in the configuration file",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Explicit path to the manifest file to bump. May point to a `deno.json`/`deno.jsonc` or a `package.json`. When set, single-file mode is forced (workspace auto-detection is bypassed). Useful when both `deno.json` and `package.json` exist in the same directory",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-w", "--workspace"],
          description:
            "Bump every package in the workspace (auto-detected at the workspace root)",
        },
        {
          name: "--base",
          description:
            "[conventional-commits mode] Git ref to compare against. Default: current branch",
        },
        {
          name: "--dry-run",
          description: "Print the planned changes without writing any files",
        },
        {
          name: "--import-map",
          description:
            "Path to the import map to rewrite jsr: version constraints in. Defaults to the root deno.json (or its importMap target)",
        },
        {
          name: "--no-workspace",
          description:
            "Disable workspace mode and only bump the deno.json/package.json in the current directory",
        },
        {
          name: "--release-notes",
          description:
            "[conventional-commits mode] Path to the release notes file to prepend. Default: Releases.md",
        },
        {
          name: "--start",
          description:
            "[conventional-commits mode] Git ref to start from. Default: latest tag (git describe --tags --abbrev=0)",
        },
      ],
    },
    {
      name: "audit",
      description: "Audit currently installed dependencies",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--fix",
          description:
            "Automatically fix vulnerabilities by upgrading packages",
        },
        {
          name: "--ignore",
          description: "Ignore advisories matching the given CVE IDs",
        },
        {
          name: "--ignore-registry-errors",
          description:
            "Return exit code 0 if remote service(s) responds with an error",
        },
        {
          name: "--ignore-unfixable",
          description:
            "Ignore advisories that don't have any actions to resolve them",
        },
        {
          name: "--level",
          description:
            "Only show advisories with severity greater or equal to the one specified [possible values: low, moderate, high, critical]",
        },
        {
          name: "--socket",
          description: "Check against socket.dev vulnerability database",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
      ],
    },
    {
      name: "approve-scripts",
      description: "Approve npm lifecycle scripts for installed dependencies",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
      ],
    },
    {
      name: "add",
      description: "Add dependencies to your configuration file",
      options: [
        {
          name: ["-I", "--allow-import"],
          description:
            "Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443",
        },
        {
          name: ["-D", "--dev"],
          description:
            "Add the package as a dev dependency. Note: This only applies when adding to a `package.json` file",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--deny-import",
          description:
            "Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--jsr",
          description: "Assume unprefixed package names are jsr packages",
        },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--npm",
          description:
            "Assume unprefixed package names are npm packages (default)",
        },
        {
          name: "--package-json",
          description:
            "Force using package.json for dependency management instead of deno.json",
        },
        {
          name: "--save-exact",
          description: "Save exact version without the caret (^)",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
      ],
    },
    {
      name: "x",
      description: "Execute a binary from npm or jsr, like npx",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Configure different aspects of deno including TypeScript, linting, and code formatting. Typically the configuration file will be called `deno.json` or `deno.jsonc` and automatically detected; in that case this flag is not necessary. Docs: https://docs.deno.com/go/config",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        {
          name: ["-p", "--package"],
          description:
            "Package to install (use when the binary name differs from the package name)",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-y", "--yes"],
          description: "Assume confirmation for all prompts",
        },
        {
          name: ["-r", "--reload"],
          description:
            "Reload source code cache (recompile TypeScript) no value Reload everything jsr:@std/http/file-server,jsr:@std/assert/assert-equals Reloads specific modules npm: Reload all npm modules npm:chalk Reload specific npm module",
        },
        { name: ["-A", "--allow-all"], description: "Allow all permissions" },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-R", "--allow-read"],
          description:
            'Allow file system read access. Optionally specify allowed paths. --allow-read | --allow-read="/etc,/var/log.txt"',
        },
        {
          name: ["-W", "--allow-write"],
          description:
            'Allow file system write access. Optionally specify allowed paths. --allow-write | --allow-write="/etc,/var/log.txt"',
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-N", "--allow-net"],
          description:
            'Allow network access. Optionally specify allowed IP addresses and host names, with ports as necessary. --allow-net | --allow-net="localhost:8080,deno.land"',
        },
        {
          name: ["-E", "--allow-env"],
          description:
            'Allow access to environment variables. Optionally specify accessible environment variables. --allow-env | --allow-env="PORT,HOME,PATH"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ignore-scripts",
          description:
            "Do not run npm lifecycle scripts for the given packages",
        },
        {
          name: "--install-alias",
          description:
            "Creates a dx alias so you can run dx <command> instead of deno x <command>",
        },
        {
          name: "--location",
          description: "Value of globalThis.location used by some web APIs",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        { name: "--seed", description: "Set the random number generator seed" },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
        {
          name: "--v8-flags",
          description:
            "To see a list of all available flags use --v8-flags=--help Flags can also be set via the DENO_V8_FLAGS environment variable. Any flags set with this flag are appended after the DENO_V8_FLAGS environment variable",
        },
        {
          name: "--check",
          description:
            "Enable type-checking. This subcommand does not type-check by default If the value of \"all\" is supplied, remote modules will be included. Alternatively, the 'deno check' subcommand can be used",
        },
        {
          name: "--no-check",
          description:
            'Skip type-checking. If the value of "remote" is supplied, diagnostic errors from remote modules will be ignored',
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port [default: 127.0.0.1:9229]. Host and port are optional. Using port 0 will assign a random free port",
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port, wait for debugger to connect and break at the start of user script",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--import-map",
          description:
            "Load import map file from local file or remote URL Docs: https://docs.deno.com/runtime/manual/basics/import_maps",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        { name: "--no-remote", description: "Do not resolve remote modules" },
        {
          name: "--node-modules-dir",
          description: "Sets the node modules management mode for npm packages",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--no-prompt",
          description:
            "Always throw if required permission wasn't passed. Can also be set via the DENO_NO_PROMPT environment variable",
        },
        {
          name: "--allow-run",
          description:
            'Allow running subprocesses. Optionally specify allowed runnable program names. --allow-run | --allow-run="whoami,ps"',
        },
        {
          name: "--allow-ffi",
          description:
            '(Unstable) Allow loading dynamic libraries. Optionally specify allowed directories or files. --allow-ffi | --allow-ffi="./libfoo.so"',
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
      ],
    },
    {
      name: "deploy",
      description:
        "\u001b[1mUsage:\u001b[22m   \u001b[95mdeno deploy \u001b[33m[\u001b[95m\u001b[95mroot-path\u001b[95m\u001b[33m]\u001b[95m\u001b[39m",
    },
    {
      name: "sandbox",
      description:
        "\u001b[1mUsage:\u001b[22m   \u001b[95mdeno sandbox\u001b[39m",
    },
    {
      name: "watch",
      description:
        "Run a JavaScript or TypeScript program, watching for file changes and hot-replacing modules",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Configure different aspects of deno including TypeScript, linting, and code formatting. Typically the configuration file will be called `deno.json` or `deno.jsonc` and automatically detected; in that case this flag is not necessary. Docs: https://docs.deno.com/go/config",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-t", "--tunnel"],
          description: "Execute tasks with a tunnel to Deno Deploy",
        },
        {
          name: ["-r", "--reload"],
          description:
            "Reload source code cache (recompile TypeScript). With no value, reloads everything. Pass a comma-separated list of specifiers to reload only those modules; npm: reloads all npm modules; npm:chalk reloads a single npm module; jsr:@std/http/file-server,jsr:@std/assert/assert-equals reloads specific modules",
        },
        { name: ["-A", "--allow-all"], description: "Allow all permissions" },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-R", "--allow-read"],
          description:
            'Allow file system read access. Optionally specify allowed paths. --allow-read | --allow-read="/etc,/var/log.txt"',
        },
        {
          name: ["-W", "--allow-write"],
          description:
            'Allow file system write access. Optionally specify allowed paths. --allow-write | --allow-write="/etc,/var/log.txt"',
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-N", "--allow-net"],
          description:
            'Allow network access. Optionally specify allowed IP addresses and host names, with ports as necessary. A Unix domain socket can be scoped with unix:<absolute-path>. --allow-net | --allow-net="localhost:8080,deno.land" | --allow-net="unix:/var/run/docker.sock"',
        },
        {
          name: ["-E", "--allow-env"],
          description:
            'Allow access to environment variables. Optionally specify accessible environment variables. --allow-env | --allow-env="PORT,HOME,PATH"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--coverage",
          description:
            "Collect coverage profile data into DIR. If DIR is not specified, it uses 'coverage/'. This option can also be set via the DENO_COVERAGE_DIR environment variable",
        },
        {
          name: "--cpu-prof",
          description:
            "Start the V8 CPU profiler on startup and write the profile to disk on exit. Profiles are written to the current directory by default",
        },
        {
          name: "--cpu-prof-dir",
          description:
            "Directory where the V8 CPU profiles will be written. Implicitly enables --cpu-prof",
        },
        {
          name: "--cpu-prof-flamegraph",
          description: "Generate an SVG flamegraph alongside the CPU profile",
        },
        {
          name: "--cpu-prof-interval",
          description: "Sampling interval in microseconds for CPU profiling",
        },
        {
          name: "--cpu-prof-md",
          description:
            "Generate a human-readable markdown report alongside the CPU profile",
        },
        {
          name: "--cpu-prof-name",
          description:
            "Filename for the CPU profile (defaults to CPU.<timestamp>.<pid>.cpuprofile)",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ext",
          description:
            "Set content type of the supplied file [possible values: ts, tsx, js, jsx, mts, mjs, cts, cjs]",
        },
        {
          name: "--location",
          description: "Value of globalThis.location used by some web APIs",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-code-cache",
          description: "Disable V8 code cache feature",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        { name: "--seed", description: "Set the random number generator seed" },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
        {
          name: "--use-env-proxy",
          description:
            "Use HTTP_PROXY, HTTPS_PROXY, and NO_PROXY for node:http/node:https",
        },
        {
          name: "--v8-flags",
          description:
            "To see a list of all available flags use --v8-flags=--help Flags can also be set via the DENO_V8_FLAGS environment variable. Any flags set with this flag are appended after the DENO_V8_FLAGS environment variable",
        },
        {
          name: "--check",
          description:
            "Enable type-checking. This subcommand does not type-check by default; pass --check=all to also type-check remote modules. Alternatively, use the 'deno check' subcommand",
        },
        {
          name: "--no-check",
          description:
            'Skip type-checking. If the value of "remote" is supplied, diagnostic errors from remote modules will be ignored',
        },
        {
          name: "--watch-hmr",
          description:
            "Watch for file changes and hot-replace modules. The process restarts if hot replacement fails. Local files from entry point module graph are watched by default. Additional paths might be watched by passing them as arguments to this flag",
        },
        {
          name: "--no-clear-screen",
          description: "Do not clear terminal screen when under watch mode",
        },
        {
          name: "--watch",
          description:
            "Watch for file changes and restart process automatically. Local files from entry point module graph are watched by default. Additional paths might be watched by passing them as arguments to this flag",
        },
        {
          name: "--watch-exclude",
          description: "Exclude provided files/patterns from watch mode",
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port [default: 127.0.0.1:9229]. Host and port are optional. Using port 0 will assign a random free port",
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port, wait for debugger to connect and break at the start of user script",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--import-map",
          description:
            "Load import map file from local file or remote URL Docs: https://docs.deno.com/runtime/manual/basics/import_maps",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        { name: "--no-remote", description: "Do not resolve remote modules" },
        {
          name: "--node-modules-dir",
          description:
            "Selects the node_modules directory mode for npm packages (not a path). One of: auto (create a local node_modules directory and install npm packages into it), manual (use the existing local node_modules directory, do not modify it), none (do not use a local node_modules directory; resolve npm packages from the global cache). Defaults to auto when the flag is passed without a value",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--no-prompt",
          description:
            "Always throw if required permission wasn't passed. Can also be set via the DENO_NO_PROMPT environment variable",
        },
        {
          name: "--allow-run",
          description:
            'Allow running subprocesses. Optionally specify allowed runnable program names. --allow-run | --allow-run="whoami,ps"',
        },
        {
          name: "--allow-ffi",
          description:
            '(Unstable) Allow loading dynamic libraries. Optionally specify allowed directories or files. --allow-ffi | --allow-ffi="./libfoo.so"',
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
      ],
    },
    {
      name: "unlink",
      description: "Remove a linked local package from the current project",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
      ],
    },
    {
      name: "list",
      description: "List the dependencies declared in deno.json / package.json",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-r", "--recursive"],
          description: "Include all workspace members",
        },
        {
          name: "--depth",
          description:
            "Maximum depth of the dependency tree to display (0 = direct dependencies only)",
        },
        { name: "--dev", description: "Only list development dependencies" },
        { name: "--prod", description: "Only list production dependencies" },
      ],
    },
    {
      name: "link",
      description:
        "Link a local JSR package into the current project for development",
      options: [
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: "--lockfile-only",
          description: "Install only updating the lockfile",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
      ],
    },
    {
      name: "desktop",
      description: "Build and run desktop applications",
      options: [
        {
          name: ["-c", "--config"],
          description:
            "Configure different aspects of deno including TypeScript, linting, and code formatting. Typically the configuration file will be called `deno.json` or `deno.jsonc` and automatically detected; in that case this flag is not necessary. Docs: https://docs.deno.com/go/config",
        },
        {
          name: ["-h", "--help"],
          description: "[possible values: unstable, full]",
        },
        { name: ["-q", "--quiet"], description: "Suppress diagnostic output" },
        {
          name: ["-o", "--output"],
          description:
            "Output path (e.g. MyApp.app, MyApp.dmg, MyApp.AppImage, MyApp.deb, MyApp.rpm, MyApp.msi)",
        },
        {
          name: ["-r", "--reload"],
          description:
            "Reload source code cache (recompile TypeScript). With no value, reloads everything. Pass a comma-separated list of specifiers to reload only those modules; npm: reloads all npm modules; npm:chalk reloads a single npm module; jsr:@std/http/file-server,jsr:@std/assert/assert-equals reloads specific modules",
        },
        { name: ["-A", "--allow-all"], description: "Allow all permissions" },
        {
          name: ["-P", "--permission-set"],
          description: "Loads the permission set from the config file",
        },
        {
          name: ["-R", "--allow-read"],
          description:
            'Allow file system read access. Optionally specify allowed paths. --allow-read | --allow-read="/etc,/var/log.txt"',
        },
        {
          name: ["-W", "--allow-write"],
          description:
            'Allow file system write access. Optionally specify allowed paths. --allow-write | --allow-write="/etc,/var/log.txt"',
        },
        {
          name: ["-I", "--allow-import"],
          description:
            'Allow importing from remote hosts. Optionally specify allowed IP addresses and host names, with ports as necessary. Default value: deno.land:443,jsr.io:443,esm.sh:443,raw.esm.sh:443,cdn.jsdelivr.net:443,raw.githubusercontent.com:443,gist.githubusercontent.com:443 --allow-import | --allow-import="example.com,github.com"',
        },
        {
          name: ["-N", "--allow-net"],
          description:
            'Allow network access. Optionally specify allowed IP addresses and host names, with ports as necessary. A Unix domain socket can be scoped with unix:<absolute-path>. --allow-net | --allow-net="localhost:8080,deno.land" | --allow-net="unix:/var/run/docker.sock"',
        },
        {
          name: ["-E", "--allow-env"],
          description:
            'Allow access to environment variables. Optionally specify accessible environment variables. --allow-env | --allow-env="PORT,HOME,PATH"',
        },
        {
          name: ["-S", "--allow-sys"],
          description:
            'Allow access to OS information. Optionally allow specific APIs by function name. --allow-sys | --allow-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--allow-scripts",
          description:
            "Allow running npm lifecycle scripts for the given packages Note: Scripts will only be executed when using a node_modules directory (`--node-modules-dir`)",
        },
        {
          name: "--cert",
          description: "Load certificate authority from PEM encoded file",
        },
        {
          name: "--conditions",
          description:
            "Use this argument to specify custom conditions for npm package exports. You can also use DENO_CONDITIONS env var",
        },
        {
          name: "--env-file",
          description:
            "Load environment variables from local file Only the first environment variable with a given key is used. Existing process environment variables are not overwritten, so if variables with the same names already exist in the environment, their values will be preserved. Where multiple declarations for the same environment variable exist in your .env file, the first one encountered is applied. This is determined by the order of the files you pass as arguments",
        },
        {
          name: "--ext",
          description:
            "Set content type of the supplied file [possible values: ts, tsx, js, jsx, mts, mjs, cts, cjs]",
        },
        {
          name: "--location",
          description: "Value of globalThis.location used by some web APIs",
        },
        {
          name: "--minimum-dependency-age",
          description:
            "(Unstable) The age in minutes, ISO-8601 duration or RFC3339 absolute timestamp (e.g. '120' for two hours, 'P2D' for two days, '2025-09-16' for cutoff date, '2025-09-16T12:00:00+00:00' for cutoff time, '0' to disable)",
        },
        {
          name: "--no-code-cache",
          description: "Disable V8 code cache feature",
        },
        {
          name: "--no-config",
          description: "Disable automatic loading of the configuration file",
        },
        {
          name: "--preload",
          description:
            "A list of files that will be executed before the main module",
        },
        {
          name: "--require",
          description:
            "A list of CommonJS modules that will be executed before the main module",
        },
        { name: "--seed", description: "Set the random number generator seed" },
        {
          name: "--unstable",
          description:
            "The `--unstable` flag has been deprecated. Use granular `--unstable-*` flags instead To view the list of individual unstable feature flags, run this command again with --help=unstable",
        },
        {
          name: "--v8-flags",
          description:
            "To see a list of all available flags use --v8-flags=--help Flags can also be set via the DENO_V8_FLAGS environment variable. Any flags set with this flag are appended after the DENO_V8_FLAGS environment variable",
        },
        {
          name: "--all-targets",
          description: "Build for all supported target platforms",
        },
        {
          name: "--backend",
          description:
            "Backend to use for the desktop app [default: webview] [possible values: webview, cef, raw]",
        },
        {
          name: "--compress",
          description:
            "Make the packaged app self-extracting: the payload is compressed inside the app and unpacked on first launch. Off by default. Defaults to xz (decompressed by the system `tar` everywhere); zstd is smaller/faster but needs the `zstd` tool at runtime. [possible values: xz, lzma, zstd]",
        },
        {
          name: "--exclude",
          description:
            "Excludes a file/directory in the compiled executable. Use this flag to exclude a specific file or directory within the included files",
        },
        {
          name: "--hmr",
          description:
            "Run the desktop app with Hot Module Replacement enabled",
        },
        {
          name: "--icon",
          description:
            "Set the application icon (.ico on Windows, .icns or .png on macOS)",
        },
        {
          name: "--include",
          description:
            "Includes an additional module or file/directory in the compiled executable. Use this flag if a dynamically imported module or a web worker main module fails to load in the executable or to embed a file or directory in the executable. This flag can be passed multiple times, to include multiple additional modules",
        },
        {
          name: "--target",
          description:
            "Target OS architecture [possible values: x86_64-unknown-linux-gnu, aarch64-unknown-linux-gnu, x86_64-pc-windows-msvc, x86_64-apple-darwin, aarch64-apple-darwin]",
        },
        {
          name: "--check",
          description:
            "Set type-checking behavior. This subcommand type-checks local modules by default, so passing --check is redundant; pass --check=all to also type-check remote modules. Alternatively, use the 'deno check' subcommand",
        },
        {
          name: "--no-check",
          description:
            'Skip type-checking. If the value of "remote" is supplied, diagnostic errors from remote modules will be ignored',
        },
        {
          name: "--inspect",
          description:
            "Activate inspector on host:port [default: 127.0.0.1:9229]. Host and port are optional. Using port 0 will assign a random free port",
        },
        {
          name: "--inspect-brk",
          description:
            "Activate inspector on host:port, wait for debugger to connect and break at the start of user script",
        },
        {
          name: "--inspect-renderer",
          description:
            "Override the CEF renderer debugger listen address; defaults to an auto-allocated port",
        },
        {
          name: "--inspect-wait",
          description:
            "Activate inspector on host:port and wait for debugger to connect before running user code",
        },
        {
          name: "--cached-only",
          description: "Require that remote dependencies are already cached",
        },
        {
          name: "--frozen",
          description:
            "Error out if lockfile is out of date [possible values: true, false]",
        },
        {
          name: "--import-map",
          description:
            "Load import map file from local file or remote URL Docs: https://docs.deno.com/runtime/manual/basics/import_maps",
        },
        {
          name: "--lock",
          description:
            'Check the specified lock file. (If value is not provided, defaults to "./deno.lock")',
        },
        {
          name: "--no-lock",
          description: "Disable auto discovery of the lock file",
        },
        { name: "--no-npm", description: "Do not resolve npm modules" },
        { name: "--no-remote", description: "Do not resolve remote modules" },
        {
          name: "--node-modules-dir",
          description:
            "Selects the node_modules directory mode for npm packages (not a path). One of: auto (create a local node_modules directory and install npm packages into it), manual (use the existing local node_modules directory, do not modify it), none (do not use a local node_modules directory; resolve npm packages from the global cache). Defaults to auto when the flag is passed without a value",
        },
        {
          name: "--node-modules-linker",
          description:
            "Sets the linker mode for npm packages (isolated or hoisted)",
        },
        {
          name: "--vendor",
          description:
            "Toggles local vendor folder usage for remote modules and a node_modules folder for npm packages [possible values: true, false]",
        },
        {
          name: "--no-prompt",
          description:
            "Always throw if required permission wasn't passed. Can also be set via the DENO_NO_PROMPT environment variable",
        },
        {
          name: "--allow-run",
          description:
            'Allow running subprocesses. Optionally specify allowed runnable program names. --allow-run | --allow-run="whoami,ps"',
        },
        {
          name: "--allow-ffi",
          description:
            '(Unstable) Allow loading dynamic libraries. Optionally specify allowed directories or files. --allow-ffi | --allow-ffi="./libfoo.so"',
        },
        {
          name: "--deny-read",
          description:
            'Deny file system read access. Optionally specify denied paths. --deny-read | --deny-read="/etc,/var/log.txt"',
        },
        {
          name: "--deny-write",
          description:
            'Deny file system write access. Optionally specify denied paths. --deny-write | --deny-write="/etc,/var/log.txt"',
        },
        {
          name: "--deny-net",
          description:
            'Deny network access. Optionally specify defined IP addresses and host names, with ports as necessary. --deny-net | --deny-net="localhost:8080,deno.land"',
        },
        {
          name: "--deny-env",
          description:
            'Deny access to environment variables. Optionally specify inacessible environment variables. --deny-env | --deny-env="PORT,HOME,PATH"',
        },
        {
          name: "--deny-sys",
          description:
            'Deny access to OS information. Optionally deny specific APIs by function name. --deny-sys | --deny-sys="systemMemoryInfo,osRelease"',
        },
        {
          name: "--deny-run",
          description:
            'Deny running subprocesses. Optionally specify denied runnable program names. --deny-run | --deny-run="whoami,ps"',
        },
        {
          name: "--deny-ffi",
          description:
            '(Unstable) Deny loading dynamic libraries. Optionally specify denied directories or files. --deny-ffi | --deny-ffi="./libfoo.so"',
        },
        {
          name: "--deny-import",
          description:
            'Deny importing from remote hosts. Optionally specify denied IP addresses and host names, with ports as necessary. --deny-import | --deny-import="example.com:443,github.com:443"',
        },
        {
          name: "--ignore-env",
          description:
            'Ignore access to environment variables returning `undefined`. Optionally specify ignored environment variables. --ignore-env | --ignore-env="PORT,HOME,PATH"',
        },
        {
          name: "--ignore-read",
          description:
            'Ignore file system read access with a `NotFound` error. Optionally specify ignored paths. --ignore-read | --ignore-read="/etc,/var/log.txt" DENO_TRACE_PERMISSIONS Environmental variable to enable stack traces in permission prompts. DENO_TRACE_PERMISSIONS=1 deno run main.ts DENO_AUDIT_PERMISSIONS Environmental variable to audit all permissions accesses. Set to a file path for JSONL output, or "otel" to emit as OpenTelemetry log events via the configured OTel exporter. DENO_AUDIT_PERMISSIONS=./audit.jsonl deno run main.ts DENO_AUDIT_PERMISSIONS=otel deno run main.ts',
        },
      ],
    },
  ],
  options: [
    {
      name: ["-L", "--log-level"],
      description: "Set log level",
      hidden: true,
      args: {
        name: "log-level",
        isOptional: true,
        suggestions: ["debug", "info"],
      },
    },
    {
      name: ["-h", "--help"],
      description: "Print help information",
    },
    {
      name: ["-V", "--version"],
      description: "Print version information",
    },
    {
      name: "--unstable",
      description: "Enable unstable features and APIs",
    },
    {
      name: ["-q", "--quiet"],
      description: "Suppress diagnostic output",
    },
  ],
};

export default completion;
