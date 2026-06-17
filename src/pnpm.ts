// GENERATORS

import { npmScriptsGenerator, npmSearchGenerator } from "./npm";
import { dependenciesGenerator, nodeClis } from "./yarn";

const filterMessages = (out: string): string => {
  return out.startsWith("warning:") || out.startsWith("error:")
    ? out.split("\n").slice(1).join("\n")
    : out;
};

const searchBranches: Fig.Generator = {
  script: ["git", "branch", "--no-color"],
  postProcess: function (out) {
    const output = filterMessages(out);

    if (output.startsWith("fatal:")) {
      return [];
    }

    return output.split("\n").map((elm) => {
      let name = elm.trim();
      const parts = elm.match(/\S+/g);
      if (parts && parts.length > 1) {
        if (parts[0] == "*") {
          // Current branch.
          return {
            name: elm.replace("*", "").trim(),
            description: "Current branch",
            icon: "⭐️",
          };
        } else if (parts[0] == "+") {
          // Branch checked out in another worktree.
          name = elm.replace("+", "").trim();
        }
      }

      return {
        name,
        description: "Branch",
        icon: "fig://icon?type=git",
      };
    });
  },
};

const generatorInstalledPackages: Fig.Generator = {
  script: ["pnpm", "ls", "--depth", "0", "--json"],
  postProcess: (out) => {
    if (out.includes("ERR_PNPM")) return [];
    const [project] = JSON.parse(out);
    const deps = {
      ...project.dependencies,
      ...project.devDependencies,
      ...project.optionalDependencies,
    };
    return Object.keys(deps).map((name) => ({
      name,
      icon: "fig://icon?type=package",
    }));
  },
};

const FILTER_OPTION: Fig.Option = {
  name: ["-F", "--filter"],
  args: {
    template: "filepaths",
    name: "Filepath / Package",
    description:
      "To only select packages under the specified directory, you may specify any absolute path, typically in POSIX format",
  },
  description: `Filtering allows you to restrict commands to specific subsets of packages.
pnpm supports a rich selector syntax for picking packages by name or by relation.
More details: https://pnpm.io/filtering`,
};

const FILTER_PROD_OPTION: Fig.Option = {
  name: "--filter-prod",
  args: { name: "pattern" },
  description:
    "Acts like --filter, but omits devDependencies when selecting dependency projects",
};

/** Options that being appended for `pnpm i` and `add` */
const INSTALL_BASE_OPTIONS: Fig.Option[] = [
  {
    name: "--offline",
    description:
      "If true, pnpm will use only packages already available in the store. If a package won't be found locally, the installation will fail",
  },
  {
    name: "--prefer-offline",
    description:
      "If true, staleness checks for cached data will be bypassed, but missing data will be requested from the server. To force full offline mode, use --offline",
  },
  {
    name: "--ignore-scripts",
    description:
      "Do not execute any scripts defined in the project package.json and its dependencies",
  },
  {
    name: "--reporter",
    description: `Allows you to choose the reporter that will log debug info to the terminal about the installation progress`,
    args: {
      name: "Reporter Type",
      suggestions: ["silent", "default", "append-only", "ndjson"],
    },
  },
];

/** Base options for pnpm i when run without any arguments */
const INSTALL_OPTIONS: Fig.Option[] = [
  {
    name: ["-P", "--prod", "--save-prod"],
    description: `Pnpm will not install any package listed in devDependencies if the NODE_ENV environment variable is set to production.
Use this flag to instruct pnpm to ignore NODE_ENV and take its production status from this flag instead`,
  },
  {
    name: ["-D", "--dev", "--save-dev"],
    description:
      "Only devDependencies are installed and dependencies are removed regardless of the NODE_ENV",
  },
  {
    name: "--no-optional",
    description: "OptionalDependencies are not installed",
  },
  {
    name: "--lockfile-only",
    description:
      "When used, only updates pnpm-lock.yaml and package.json instead of checking node_modules and downloading dependencies",
  },
  {
    name: "--frozen-lockfile",
    description:
      "If true, pnpm doesn't generate a lockfile and fails to install if the lockfile is out of sync with the manifest / an update is needed or no lockfile is present",
  },
  {
    name: "--no-frozen-lockfile",
    description:
      "Disregards the lockfile-related strictness even in CI environments",
  },
  {
    name: "--prefer-frozen-lockfile",
    description:
      "If the lockfile is up to date, the dependencies are installed bypassing the resolution and full lockfile check. Otherwise behaves like a normal install",
  },
  {
    name: "--fix-lockfile",
    description: "Fix broken lockfile entries automatically",
  },
  {
    name: "--no-lockfile",
    description: "Don't read or generate a pnpm-lock.yaml file",
  },
  {
    name: "--merge-git-branch-lockfiles",
    description: "Merge per-git-branch lockfiles back into pnpm-lock.yaml",
  },
  {
    name: "--resolution-only",
    description:
      "Re-runs resolution: useful for printing out peer dependency issues",
  },
  {
    name: "--update-checksums",
    description: "Update checksums in pnpm-lock.yaml",
  },
  {
    name: "--no-runtime",
    description: "Skip downloading the runtime declared in package.json",
  },
  {
    name: "--force",
    description: "Force reinstall dependencies: refetch and rebuild everything",
  },
  {
    name: "--use-store-server",
    description:
      "Starts a store server in the background. The store server will keep running after installation is done. To stop the store server, run pnpm server stop",
  },
  {
    name: "--shamefully-hoist",
    description:
      "Creates a flat node_modules structure, similar to that of npm or yarn. WARNING: This is highly discouraged",
  },
  {
    name: "--hoist-pattern",
    description:
      "Glob patterns of dependencies to hoist to the root of node_modules",
    args: { name: "pattern" },
  },
  {
    name: "--no-hoist",
    description: "Disable hoisting of dependencies to the root of node_modules",
  },
  {
    name: "--public-hoist-pattern",
    description:
      "Glob patterns to hoist publicly (visible to non-direct-dependencies)",
    args: { name: "pattern" },
  },
  {
    name: "--side-effects-cache",
    description: "Use and cache the results of (pre/post)install hooks",
  },
  {
    name: "--side-effects-cache-readonly",
    description: "Only use the side effects cache if present, do not create it",
  },
  {
    name: "--package-import-method",
    description:
      "Controls the way packages are imported from the store (if you want to disable symlinks inside node_modules, then choose copy or clone)",
    args: {
      name: "method",
      suggestions: ["auto", "hardlink", "clone", "copy"],
    },
  },
  {
    name: "--child-concurrency",
    description: "Controls the number of child processes run parallelly",
    args: { name: "number" },
  },
  {
    name: "--network-concurrency",
    description:
      "Controls the maximum number of HTTP(S) requests to process simultaneously",
    args: { name: "number" },
  },
  {
    name: "--ignore-pnpmfile",
    description: "Disable .pnpmfile.cjs",
  },
  {
    name: "--ignore-workspace",
    description: "Ignore pnpm-workspace.yaml",
  },
  {
    name: "--lockfile-dir",
    description: "The directory in which the pnpm-lock.yaml will be created",
    args: { name: "dir", template: "folders" },
  },
  {
    name: "--modules-dir",
    description: "The directory in which dependencies will be installed",
    args: { name: "dir", template: "folders" },
  },
  {
    name: "--virtual-store-dir",
    description:
      "The directory with links to the store. All direct and indirect dependencies of the project are linked into this directory",
    args: { name: "dir", template: "folders" },
  },
  {
    name: "--store-dir",
    description:
      "The directory in which all the packages are saved on the disk",
    args: { name: "dir", template: "folders" },
  },
  {
    name: "--optimistic-repeat-install",
    description: "Skip lockfile validation if the lockfile has not changed",
  },
  {
    name: "--cpu",
    description:
      "Restrict optional dependency installation by CPU architecture",
    args: { name: "name" },
  },
  {
    name: "--os",
    description: "Restrict optional dependency installation by OS",
    args: { name: "name" },
  },
  {
    name: "--libc",
    description: "Restrict optional dependency installation by libc",
    args: { name: "name" },
  },
  {
    name: "--trust-policy",
    description: "Set the trust policy for newly-installed packages",
    args: { name: "policy", suggestions: ["no-downgrade"] },
  },
  {
    name: "--trust-policy-exclude",
    description: "Exclude package(s) from the trust policy",
    args: { name: "package-spec" },
  },
  {
    name: "--trust-policy-ignore-after",
    description: "Ignore the trust policy after the given number of minutes",
    args: { name: "minutes" },
  },
  {
    name: "--trust-lockfile",
    description: "Trust the lockfile and skip resolution",
  },
  {
    name: "--frozen-store",
    description: "Open the store read-only and skip all store writes",
  },
  {
    name: "--strict-peer-dependencies",
    description:
      "Fail installation when there are missing or invalid peer dependencies",
  },
  {
    name: "--verify-store-integrity",
    description:
      "Verify that the contents of the store match the lockfile checksums",
  },
  {
    name: "--no-verify-store-integrity",
    description: "Skip verifying store integrity",
  },
];

/** Base options for pnpm add */
const INSTALL_PACKAGE_OPTIONS: Fig.Option[] = [
  {
    name: ["-P", "-p", "--save-prod"],
    description: "Install the specified packages as regular dependencies",
  },
  {
    name: ["-D", "-d", "--save-dev"],
    description: "Install the specified packages as devDependencies",
  },
  {
    name: ["-O", "-o", "--save-optional"],
    description: "Install the specified packages as optionalDependencies",
  },
  {
    name: "--no-save",
    description: "Prevents saving to `dependencies`",
  },
  {
    name: ["-E", "--save-exact"],
    description:
      "Saved dependencies will be configured with an exact version rather than using pnpm's default semver range operator",
  },
  {
    name: ["-e", "--save-peer"],
    description:
      "Using --save-peer will add one or more packages to peerDependencies and install them as dev dependencies",
  },
  {
    name: "--save-catalog",
    description: `Save the dependency to the default catalog and reference it via "catalog:" in package.json`,
  },
  {
    name: "--save-catalog-name",
    description: `Save the dependency to the named catalog and reference it via "catalog:<name>" in package.json`,
    args: { name: "name" },
  },
  {
    name: "--config",
    description: `Save the dependency as a configurational dependency`,
  },
  {
    name: "--allow-build",
    description: `A list of package names that are allowed to run postinstall scripts during installation`,
    args: { name: "pkg" },
  },
  {
    name: ["--ignore-workspace-root-check", "-W"],
    description: `Adding a new dependency to the root workspace package fails, unless the --ignore-workspace-root-check or -W flag is used.
For instance, pnpm add debug -W`,
  },
  {
    name: ["--global", "-g"],
    description: `Install a package globally`,
  },
  {
    name: "--workspace",
    description: `Only adds the new dependency if it is found in the workspace`,
  },
  {
    name: "--save-workspace-protocol",
    description: `Save packages from the workspace with a "workspace:" protocol. True by default`,
  },
  {
    name: "--no-save-workspace-protocol",
    description: `Disable saving packages from the workspace with a "workspace:" protocol`,
  },
  {
    name: "--cpu",
    description: `Restrict optional dependency installation to the listed CPU architecture(s)`,
    args: { name: "name" },
  },
  {
    name: "--os",
    description: `Restrict optional dependency installation to the listed OS(es)`,
    args: { name: "name" },
  },
  {
    name: "--libc",
    description: `Restrict optional dependency installation to the listed libc(s)`,
    args: { name: "name" },
  },
  {
    name: "--registry",
    description: `Use a specific registry for this command`,
    args: { name: "url" },
  },
  FILTER_OPTION,
];

// SUBCOMMANDS
const SUBCOMMANDS_MANAGE_DEPENDENCIES: Fig.Subcommand[] = [
  {
    name: "add",
    description: `Installs a package and any packages that it depends on. By default, any new package is installed as a production dependency`,
    args: {
      name: "package",
      generators: npmSearchGenerator,
      debounce: true,
      isVariadic: true,
    },
    options: [
      ...INSTALL_BASE_OPTIONS,
      ...INSTALL_PACKAGE_OPTIONS,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-r", "--recursive"],
        description:
          'Run installation recursively in every package found in subdirectories or in every workspace package, when executed inside a workspace. For options that may be used with `-r`, see "pnpm help recursive"',
      },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--global-dir",
        description: "Specify a custom directory to store global packages",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--store-dir",
        description:
          "The directory in which all packages are saved on disk. Use a shared store only with trusted users and jobs",
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--virtual-store-dir",
        description:
          "The directory with links to the store (default is node_modules/.pnpm). All direct and indirect dependencies of the project are linked into this directory",
      },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: ["install", "i"],
    description: `Pnpm install is used to install all dependencies for a project.
In a CI environment, installation fails if a lockfile is present but needs an update.
Inside a workspace, pnpm install installs all dependencies in all the projects.
If you want to disable this behavior, set the recursive-install setting to false`,
    async generateSpec(tokens) {
      // `pnpm i` with args is an `pnpm add` alias
      const hasArgs =
        tokens.filter((token) => token.trim() !== "" && !token.startsWith("-"))
          .length > 2;

      return {
        name: "install",
        options: [
          ...INSTALL_BASE_OPTIONS,
          ...(hasArgs ? INSTALL_PACKAGE_OPTIONS : INSTALL_OPTIONS),
        ],
      };
    },
    args: {
      name: "package",
      isOptional: true,
      generators: npmSearchGenerator,
      debounce: true,
      isVariadic: true,
    },
  },
  {
    name: ["install-test", "it"],
    description:
      "Runs pnpm install followed immediately by pnpm test. It takes exactly the same arguments as pnpm install",
    options: [...INSTALL_BASE_OPTIONS, ...INSTALL_OPTIONS],
  },
  {
    name: ["update", "upgrade", "up"],
    description: `Pnpm update updates packages to their latest version based on the specified range.
When used without arguments, updates all dependencies. You can use patterns to update specific dependencies`,
    args: {
      name: "Package",
      isOptional: true,
      filterStrategy: "fuzzy",
      generators: dependenciesGenerator,
      isVariadic: true,
    },
    options: [
      {
        name: ["--recursive", "-r"],
        description:
          "Concurrently runs update in all subdirectories with a package.json (excluding node_modules)",
      },
      {
        name: ["--latest", "-L"],
        description:
          "Ignores the version range specified in package.json. Instead, the version specified by the latest tag will be used (potentially upgrading the packages across major versions)",
      },
      {
        name: ["-g", "--global"],
        description: "Update global packages",
      },
      {
        name: "--no-optional",
        description: "Don't update packages in optionalDependencies",
      },
      {
        name: ["--interactive", "-i"],
        description:
          "Show outdated dependencies and select which ones to update",
      },
      {
        name: "--workspace",
        description: `Tries to link all packages from the workspace. Versions are updated to match the versions of packages inside the workspace.
If specific packages are updated, the command will fail if any of the updated dependencies are not found inside the workspace. For instance, the following command fails if express is not a workspace package: pnpm up -r --workspace express`,
      },
      {
        name: "--depth",
        description: `How deep should levels of dependencies be inspected. 0 is default, which means top-level dependencies`,
        args: { name: "number" },
      },
      FILTER_OPTION,
      {
        name: ["-D", "--dev"],
        description: 'Update packages only in "devDependencies"',
      },
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-P", "--prod"],
        description:
          'Update packages only in "dependencies" and "optionalDependencies"',
      },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--global-dir",
        description: "Specify a custom directory to store global packages",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: ["remove", "rm", "uninstall", "un", "uni"],
    description: `Removes packages from node_modules and from the project's package.json`,
    args: {
      name: "Package",
      filterStrategy: "fuzzy",
      generators: dependenciesGenerator,
      isVariadic: true,
    },
    options: [
      {
        name: ["--recursive", "-r"],
        description: `When used inside a workspace, removes a dependency (or dependencies) from every workspace package.
When used not inside a workspace, removes a dependency (or dependencies) from every package found in subdirectories`,
      },
      {
        name: ["-P", "--save-prod"],
        description: `Only remove the dependency from dependencies`,
      },
      {
        name: ["-D", "--save-dev"],
        description: "Only remove the dependency from devDependencies",
      },
      {
        name: ["--save-optional", "-O"],
        description: "Only remove the dependency from optionalDependencies",
      },
      FILTER_OPTION,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--global-dir",
        description: "Specify a custom directory to store global packages",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: ["link", "ln"],
    description: `Connect the local project to another one. Adds the dependency to the local project as an override pointing at the linked path`,
    args: {
      name: "path",
      template: "folders",
    },
    options: [
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
    ],
  },
  {
    name: "unlink",
    description: `Unlinks a system-wide package (inverse of pnpm link).
If called without arguments, all linked dependencies will be unlinked.
This is similar to yarn unlink, except pnpm re-installs the dependency after removing the external link`,
    args: [
      {
        name: "Package",
        filterStrategy: "fuzzy",
        generators: dependenciesGenerator,
        isVariadic: true,
      },
      { template: "filepaths" },
    ],
    options: [
      {
        name: ["--recursive", "-r"],
        description: `Unlink in every package found in subdirectories or in every workspace package, when executed inside a workspace`,
      },
      FILTER_OPTION,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
    ],
  },
  {
    name: "import",
    description:
      "Pnpm import generates a pnpm-lock.yaml from an npm package-lock.json (or npm-shrinkwrap.json) file",
  },
  {
    name: ["rebuild", "rb"],
    description: `Rebuild a package`,
    args: [
      {
        name: "Package",
        filterStrategy: "fuzzy",
        generators: dependenciesGenerator,
        isVariadic: true,
      },
      { template: "filepaths" },
    ],
    options: [
      {
        name: ["--recursive", "-r"],
        description: `This command runs the pnpm rebuild command in every package of the monorepo`,
      },
      {
        name: "--pending",
        description: `Rebuild packages that were not built during installation`,
      },
      {
        name: "--store-dir",
        description: `The directory in which all the packages are saved on the disk`,
        args: { name: "dir", template: "folders" },
      },
      FILTER_OPTION,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "prune",
    description: `Removes unnecessary packages`,
    options: [
      {
        name: "--prod",
        description: `Remove the packages specified in devDependencies`,
      },
      {
        name: "--no-optional",
        description: `Remove the packages specified in optionalDependencies`,
      },
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      { name: "--ignore-scripts", description: "Don't run lifecycle scripts" },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
    ],
  },
  {
    name: "fetch",
    description: `EXPERIMENTAL FEATURE: Fetch packages from a lockfile into virtual store, package manifest is ignored: https://pnpm.io/cli/fetch`,
    options: [
      {
        name: ["-P", "--prod"],
        description: `Development packages will not be fetched`,
      },
      {
        name: ["-D", "--dev"],
        description: `Only development packages will be fetched`,
      },
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
    ],
  },
  {
    name: "patch",
    description: `This command will cause a package to be extracted in a temporary directory intended to be editable at will`,
    args: {
      name: "package",
      generators: generatorInstalledPackages,
    },
    options: [
      {
        name: "--edit-dir",
        description: `The package that needs to be patched will be extracted to this directory`,
      },
      {
        name: "--ignore-existing",
        description: `Ignore existing patch files when preparing the patch directory`,
      },
    ],
  },
  {
    name: "patch-commit",
    args: {
      name: "dir",
    },
    description: `Generate a patch out of a directory`,
    options: [
      {
        name: "--patches-dir",
        description: `Directory where generated patch files are written`,
        args: { name: "dir", template: "folders" },
      },
    ],
  },
  {
    name: "patch-remove",
    args: {
      name: "package",
      isVariadic: true,
      // TODO: would be nice to have a generator of all patched packages
    },
  },
  {
    name: "dedupe",
    description: `Perform an install removing older dependencies in the lockfile if a newer version can be used`,
    options: [
      {
        name: "--check",
        description: `Check whether dedupe would change the lockfile, exit with non-zero status if so`,
      },
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--global-dir",
        description: "Specify a custom directory to store global packages",
      },
      { name: "--ignore-scripts", description: "Don't run lifecycle scripts" },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--offline",
        description:
          "Trigger an error if any required dependencies are not available in local store",
      },
      {
        name: "--prefer-offline",
        description:
          "Skip staleness checks for cached data, but request missing data from the server",
      },
      {
        name: "--store-dir",
        description:
          "The directory in which all packages are saved on disk. Use a shared store only with trusted users and jobs",
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--virtual-store-dir",
        description:
          "The directory with links to the store (default is node_modules/.pnpm). All direct and indirect dependencies of the project are linked into this directory",
      },
    ],
  },
  {
    name: "dlx",
    description: `Fetches a package from the registry without installing it as a dependency, hot loads it, and runs whatever default command binary it exposes`,
    args: {
      name: "command",
      isVariadic: true,
    },
    options: [
      {
        name: "--package",
        description: `The package to install before running the command. Can be repeated`,
        args: { name: "package", isVariadic: true },
      },
      {
        name: "--allow-build",
        description: `A list of package names that are allowed to run postinstall scripts during installation`,
        args: { name: "pkg" },
      },
      {
        name: ["-c", "--shell-mode"],
        description: `Runs the script inside of a shell`,
      },
      {
        name: ["-s", "--silent"],
        description:
          ", --reporter silent No output is logged to the console, not even fatal errors",
      },
      {
        name: "--reporter",
        description:
          "Append-only The output is always appended to the end. No cursor manipulations are performed",
      },
    ],
  },
  {
    name: "create",
    description: `Create a project from a "create-*" or "@foo/create-*" starter kit`,
    args: {
      name: "starter",
      isVariadic: true,
    },
    options: [
      {
        name: "--allow-build",
        description:
          "A list of package names that are allowed to run postinstall scripts during installation",
      },
    ],
  },
  {
    name: "deploy",
    description: `Deploy a package from a workspace. The deployed package only contains its production dependencies (no symlinks to the workspace)`,
    args: {
      name: "target directory",
      template: "folders",
    },
    options: [
      {
        name: ["-P", "--prod"],
        description: `Packages in devDependencies won't be installed`,
      },
      {
        name: ["-D", "--dev"],
        description: `Only devDependencies are installed`,
      },
      {
        name: "--no-optional",
        description: `OptionalDependencies are not installed`,
      },
      {
        name: "--legacy",
        description: `Force legacy deploy implementation`,
      },
      FILTER_OPTION,
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: ["clean", "purge"],
    description: `Safely remove node_modules directories from all workspace projects`,
    options: [
      {
        name: ["-l", "--lockfile"],
        description: `Also remove pnpm-lock.yaml`,
      },
      FILTER_OPTION,
    ],
  },
  {
    name: "approve-builds",
    description: `Approve dependencies for running scripts during installation. Without arguments, opens an interactive UI`,
    args: {
      name: "package",
      isVariadic: true,
      isOptional: true,
    },
    options: [
      {
        name: "--all",
        description: `Approve all packages that ran build scripts`,
      },
    ],
  },
  {
    name: "ignored-builds",
    description: `Print the list of packages with blocked build scripts`,
  },
  {
    name: ["ci", "clean-install", "install-clean", "ic"],
    description: `Performs a clean install (clean + install --frozen-lockfile)`,
    options: [...INSTALL_BASE_OPTIONS, ...INSTALL_OPTIONS],
  },
  {
    name: "with",
    description: `Run pnpm at a specific version (or the currently running one) for a single invocation, ignoring packageManager and devEngines.packageManager fields`,
    args: [{ name: "version | current" }, { name: "args", isVariadic: true }],
  },
  {
    name: "sbom",
    description: `Generate a Software Bill of Materials (SBOM) for the project`,
    options: [
      {
        name: "--sbom-format",
        description: `SBOM output format`,
        args: {
          name: "format",
          suggestions: ["cyclonedx", "spdx"],
        },
      },
      {
        name: "--sbom-type",
        description: `Component type`,
        args: {
          name: "type",
          suggestions: ["library", "application"],
        },
      },
      {
        name: "--sbom-spec-version",
        description: `CycloneDX spec version (1.5, 1.6, or 1.7)`,
        args: { name: "version", suggestions: ["1.5", "1.6", "1.7"] },
      },
      {
        name: "--sbom-authors",
        description: `Comma-separated list of authors`,
        args: { name: "names" },
      },
      {
        name: "--sbom-supplier",
        description: `Supplier name`,
        args: { name: "name" },
      },
      {
        name: "--lockfile-only",
        description: `Use only data from the lockfile`,
      },
      {
        name: ["-P", "--prod"],
        description: `Include only production dependencies`,
      },
      {
        name: ["-D", "--dev"],
        description: `Include only development dependencies`,
      },
      {
        name: "--no-optional",
        description: `Exclude optional dependencies`,
      },
      {
        name: ["-F", "--filter"],
        description:
          'Restricts the scope to package names matching the given pattern. E.g.: foo, "@bar/*"',
      },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
];

const SUBCOMMANDS_RUN_SCRIPTS: Fig.Subcommand[] = [
  {
    name: ["run", "run-script"],
    description: "Runs a script defined in the package's manifest file",
    args: {
      name: "Scripts",
      filterStrategy: "fuzzy",
      generators: npmScriptsGenerator,
      isVariadic: true,
    },
    options: [
      {
        name: ["-r", "--recursive"],
        description: `This runs an arbitrary command from each package's "scripts" object. If a package doesn't have the command, it is skipped. If none of the packages have the command, the command fails`,
      },
      {
        name: "--if-present",
        description:
          "You can use the --if-present flag to avoid exiting with a non-zero exit code when the script is undefined. This lets you run potentially undefined scripts without breaking the execution chain",
      },
      {
        name: "--parallel",
        description:
          "Completely disregard concurrency and topological sorting, running a given script immediately in all matching packages with prefixed streaming output. This is the preferred flag for long-running processes over many packages, for instance, a lengthy build process",
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when each child process is finished. Reduces log noise on CI",
      },
      {
        name: "--no-bail",
        description: `Continue executing other scripts even when one fails`,
      },
      {
        name: "--report-summary",
        description: `Save the execution summary to pnpm-exec-summary.json`,
      },
      {
        name: "--reporter-hide-prefix",
        description: `Hide the package name prefix from the streamed output`,
      },
      {
        name: "--resume-from",
        description: `Resume executing scripts starting from the named package (and its dependents in topological order)`,
        args: { name: "package" },
      },
      {
        name: "--sequential",
        description: `Run scripts one at a time, in topological order`,
      },
      FILTER_OPTION,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "exec",
    description: `Execute a shell command in scope of a project.
node_modules/.bin is added to the PATH, so pnpm exec allows executing commands of dependencies`,
    args: {
      name: "Scripts",
      filterStrategy: "fuzzy",
      generators: dependenciesGenerator,
      isVariadic: true,
    },
    options: [
      {
        name: ["-r", "--recursive"],
        description: `Execute the shell command in every project of the workspace.
The name of the current package is available through the environment variable PNPM_PACKAGE_NAME (supported from pnpm v2.22.0 onwards)`,
      },
      {
        name: "--parallel",
        description:
          "Completely disregard concurrency and topological sorting, running a given script immediately in all matching packages with prefixed streaming output. This is the preferred flag for long-running processes over many packages, for instance, a lengthy build process",
      },
      {
        name: ["-c", "--shell-mode"],
        description:
          "Runs the script inside of a shell. Uses /bin/sh on UNIX and \\cmd.exe on Windows",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from parallel processes and only print when each is finished",
      },
      {
        name: "--no-reporter-hide-prefix",
        description: `Do not hide the package name prefix from the streamed output`,
      },
      {
        name: "--report-summary",
        description: `Save the execution summary to pnpm-exec-summary.json`,
      },
      {
        name: "--resume-from",
        description: `Resume executing starting from the named package`,
        args: { name: "package" },
      },
      FILTER_OPTION,
    ],
  },
  {
    name: ["test", "t", "tst"],
    description: `Runs an arbitrary command specified in the package's test property of its scripts object.
The intended usage of the property is to specify a command that runs unit or integration testing for your program`,
  },
  {
    name: "start",
    description: `Runs an arbitrary command specified in the package's start property of its scripts object. If no start property is specified on the scripts object, it will attempt to run node server.js as a default, failing if neither are present.
The intended usage of the property is to specify a command that starts your program`,
  },
  {
    name: "restart",
    description: `Restarts a package: runs the stop, restart, and start lifecycle scripts in that order`,
    options: [
      {
        name: "--if-present",
        description:
          "Avoid exiting with a non-zero exit code when the script is undefined",
      },
    ],
  },
];

const SUBCOMMANDS_REVIEW_DEPS: Fig.Subcommand[] = [
  {
    name: "audit",
    subcommands: [
      {
        name: "signatures",
        description: `Verify the integrity of registry signatures (ECDSA) for installed packages`,
      },
    ],
    description: `Checks for known security issues with the installed packages.
If security issues are found, try to update your dependencies via pnpm update.
If a simple update does not fix all the issues, use overrides to force versions that are not vulnerable.
For instance, if lodash@<2.1.0 is vulnerable, use overrides to force lodash@^2.1.0.
Details at: https://pnpm.io/cli/audit`,
    options: [
      {
        name: "--audit-level",
        description: `Only print advisories with severity greater than or equal to <severity>`,
        args: {
          name: "Audit Level",
          default: "low",
          suggestions: ["low", "moderate", "high", "critical"],
        },
      },
      {
        name: "--fix",
        description:
          "Add overrides to the package.json file in order to force non-vulnerable versions of the dependencies",
        args: {
          name: "method",
          isOptional: true,
          suggestions: ["update", "override"],
        },
      },
      {
        name: ["-i", "--interactive"],
        description:
          "Display the audit results interactively and select which advisories to fix",
      },
      {
        name: "--ignore",
        description: "Ignore advisories by CVE or GHSA id",
        args: { name: "vulnerability" },
      },
      {
        name: "--ignore-unfixable",
        description:
          "Ignore vulnerabilities that have no available fix without --force",
      },
      {
        name: "--json",
        description: `Output audit report in JSON format`,
      },
      {
        name: ["--dev", "-D"],
        description: `Only audit dev dependencies`,
      },
      {
        name: ["--prod", "-P"],
        description: `Only audit production dependencies`,
      },
      {
        name: "--no-optional",
        description: `Don't audit optionalDependencies`,
      },
      {
        name: "--ignore-registry-errors",
        description: `If the registry responds with a non-200 status code, the process should exit with 0. So the process will fail only if the registry actually successfully responds with found vulnerabilities`,
      },
    ],
  },
  {
    name: ["list", "ls", "ll", "la"],
    description: `This command will output all the versions of packages that are installed, as well as their dependencies, in a tree-structure.
Positional arguments are name-pattern@version-range identifiers, which will limit the results to only the packages named. For example, pnpm list "babel-*" "eslint-*" semver@5`,
    options: [
      {
        name: ["--recursive", "-r"],
        description: `Perform command on every package in subdirectories or on every workspace package, when executed inside a workspace`,
      },
      {
        name: "--json",
        description: `Log output in JSON format`,
      },
      {
        name: "--long",
        description: `Show extended information`,
      },
      {
        name: "--parseable",
        description: `Outputs package directories in a parseable format instead of their tree view`,
      },
      {
        name: ["-g", "--global"],
        description: `List packages in the global install directory instead of in the current project`,
      },
      {
        name: "--depth",
        description: `Max display depth of the dependency tree.
pnpm ls --depth 0 will list direct dependencies only. pnpm ls --depth -1 will list projects only. Useful inside a workspace when used with the -r option`,
        args: { name: "number" },
      },
      {
        name: ["--dev", "-D"],
        description: `Only list dev dependencies`,
      },
      {
        name: ["--prod", "-P"],
        description: `Only list production dependencies`,
      },
      {
        name: "--no-optional",
        description: `Don't list optionalDependencies`,
      },
      {
        name: "--exclude-peers",
        description: `Exclude peer dependencies from the output`,
      },
      {
        name: "--only-projects",
        description: `Display only projects of the workspace (only when used with -r)`,
      },
      {
        name: "--lockfile-only",
        description: `Read packages from the pnpm-lock.yaml instead of inspecting node_modules`,
      },
      FILTER_OPTION,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--global-dir",
        description: "Specify a custom directory to store global packages",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "outdated",
    description: `Checks for outdated packages. The check can be limited to a subset of the installed packages by providing arguments (patterns are supported)`,
    options: [
      {
        name: ["--recursive", "-r"],
        description: `Check for outdated dependencies in every package found in subdirectories, or in every workspace package when executed inside a workspace`,
      },
      {
        name: "--long",
        description: `Print details`,
      },
      {
        name: "--no-table",
        description: `Prints the outdated dependencies in a list format instead of the default table. Good for small consoles`,
      },
      {
        name: "--compatible",
        description: `Prints only versions that satisfy specifications in package.json`,
      },
      {
        name: ["--dev", "-D"],
        description: `Only list dev dependencies`,
      },
      {
        name: ["--prod", "-P"],
        description: `Only list production dependencies`,
      },
      {
        name: "--no-optional",
        description: `Doesn't check optionalDependencies`,
      },
      {
        name: "--format",
        description: `Output format`,
        args: {
          name: "format",
          suggestions: ["table", "list", "json"],
        },
      },
      {
        name: "--sort-by",
        description: `Sort outdated packages by the given criteria`,
        args: {
          name: "criteria",
          suggestions: ["name", "date"],
        },
      },
      FILTER_OPTION,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--global-dir",
        description: "Specify a custom directory to store global packages",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "why",
    description: `Shows all packages that depend on the specified package`,
    args: {
      name: "Scripts",
      filterStrategy: "fuzzy",
      generators: dependenciesGenerator,
      isVariadic: true,
    },
    options: [
      {
        name: ["--recursive", "-r"],
        description: `Show the dependency tree for the specified package on every package in subdirectories or on every workspace package when executed inside a workspace`,
      },
      {
        name: "--json",
        description: `Log output in JSON format`,
      },
      {
        name: "--long",
        description: `Show verbose output`,
      },
      {
        name: "--parseable",
        description: `Show parseable output instead of tree view`,
      },
      {
        name: ["-g", "--global"],
        description: `List packages in the global install directory instead of in the current project`,
      },
      {
        name: ["--dev", "-D"],
        description: `Only display the dependency tree for packages in devDependencies`,
      },
      {
        name: ["--prod", "-P"],
        description: `Only display the dependency tree for packages in dependencies`,
      },
      {
        name: "--depth",
        description: `Max display depth of the dependency tree`,
        args: { name: "number" },
      },
      {
        name: "--exclude-peers",
        description: `Exclude peer dependencies from the output`,
      },
      FILTER_OPTION,
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--global-dir",
        description: "Specify a custom directory to store global packages",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--no-optional",
        description: "Don't display packages from `optionalDependencies`",
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "licenses",
    description: `Check licenses in consumed packages`,
    subcommands: [
      {
        name: "list",
        description: `List licenses of all installed packages`,
        options: [
          { name: "--json", description: `Output in JSON format` },
          { name: "--long", description: `Show full license text` },
          {
            name: ["-P", "--prod"],
            description: `Only check production dependencies`,
          },
          {
            name: ["-D", "--dev"],
            description: `Only check dev dependencies`,
          },
        ],
      },
    ],
    options: [
      {
        name: ["-F", "--filter"],
        description:
          'Restricts the scope to package names matching the given pattern. E.g.: foo, "@bar/*"',
      },
      {
        name: "--no-optional",
        description: 'Don\'t check "optionalDependencies"',
      },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "peers",
    description: `Inspect peer dependency relationships`,
    subcommands: [
      {
        name: "check",
        description: `Reports unmet peer dependencies`,
      },
    ],
    options: [
      { name: "--json", description: `Output in JSON format` },
      {
        name: "--lockfile-only",
        description: `Read packages from the pnpm-lock.yaml instead of inspecting node_modules`,
      },
      { name: ["-C", "--dir"], description: "Change to directory <dir>" },
      { name: ["-h", "--help"], description: "Output usage information" },
      {
        name: ["-w", "--workspace-root"],
        description: "Run the command on the root workspace project",
      },
      {
        name: ["-y", "--yes"],
        description:
          "Automatically answer yes to prompts and run non-interactively. Will abort if an undesirable situation occurs and user input is strictly necessary",
      },
      {
        name: ["-F", "--filter"],
        description:
          'Restricts the scope to package names matching the given pattern. E.g.: foo, "@bar/*"',
      },
      {
        name: "--aggregate-output",
        description:
          "Aggregate output from child processes that are run in parallel, and only print output when child process is finished. It makes reading large logs after running `pnpm recursive` with `--parallel` or with `--workspace-concurrency` much easier (especially on CI). Only `--reporter=append-only` is supported",
      },
      {
        name: "--loglevel",
        description:
          'What level of logs to report. Any logs at or higher than the given level will be shown. Levels (lowest to highest): debug, info, warn, error. Or use "--silent" to turn off all logging',
      },
      {
        name: "--stream",
        description:
          "Stream output from child processes immediately, prefixed with the originating package directory. This allows output from different packages to be interleaved",
      },
      { name: "--use-stderr", description: "Divert all output to stderr" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
];

const SUBCOMMANDS_MISC: Fig.Subcommand[] = [
  {
    name: "publish",
    description: `Publishes a package to the registry.
When publishing a package inside a workspace, the LICENSE file from the root of the workspace is packed with the package (unless the package has a license of its own).
You may override some fields before publish, using the publishConfig field in package.json. You also can use the publishConfig.directory to customize the published subdirectory (usually using third party build tools).
When running this command recursively (pnpm -r publish), pnpm will publish all the packages that have versions not yet published to the registry`,
    args: {
      name: "tarball | dir",
      template: "filepaths",
      isOptional: true,
    },
    options: [
      {
        name: "--tag",
        description: `Publishes the package with the given tag. By default, pnpm publish updates the latest tag`,
        args: {
          name: "<tag>",
        },
      },
      {
        name: "--dry-run",
        description: `Does everything a publish would do except actually publishing to the registry`,
      },
      {
        name: "--ignore-scripts",
        description: `Ignores any publish related lifecycle scripts (prepublishOnly, postpublish, and the like)`,
      },
      {
        name: "--no-git-checks",
        description: `Don't check if current branch is your publish branch, clean, and up-to-date`,
      },
      {
        name: "--access",
        description: `Tells the registry whether the published package should be public or restricted`,
        args: {
          name: "Type",
          suggestions: ["public", "restricted"],
        },
      },
      {
        name: "--force",
        description: `Try to publish packages even if their current version is already found in the registry`,
      },
      {
        name: "--report-summary",
        description: `Save the list of published packages to pnpm-publish-summary.json. Useful when some other tooling is used to report the list of published packages`,
      },
      {
        name: "--otp",
        description: `When publishing packages that require two-factor authentication, this option can specify a one-time password`,
        args: { name: "code" },
      },
      {
        name: "--publish-branch",
        description: `Sets the branch name to publish. Default is master`,
        args: { name: "branch", generators: searchBranches },
      },
      {
        name: "--json",
        description: `Show information in JSON format`,
      },
      {
        name: "--skip-manifest-obfuscation",
        description: `Skip obfuscating the manifest of the published package`,
      },
      {
        name: ["-r", "--recursive"],
        description: `Publish all packages from the workspace`,
      },
      FILTER_OPTION,
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
      {
        name: "--batch",
        description:
          'Send all packages to the registry in a single request instead of one request per package. Requires --recursive and a registry that implements the "/-/pnpm/v1/publish" endpoint (for example, pnpr)',
      },
    ],
  },
  {
    name: ["recursive", "m", "multi"],
    description: `Runs a pnpm command recursively on all subdirectories in the package or every available workspace`,
    options: [
      {
        name: "--link-workspace-packages",
        description: `Link locally available packages in workspaces of a monorepo into node_modules instead of re-downloading them from the registry. This emulates functionality similar to yarn workspaces.
When this is set to deep, local packages can also be linked to subdependencies.
Be advised that it is encouraged instead to use npmrc for this setting, to enforce the same behaviour in all environments. This option exists solely so you may override that if necessary`,
        args: {
          name: "bool or `deep`",
          suggestions: ["true", "false", "deep"],
        },
      },
      {
        name: "--workspace-concurrency",
        description: `Set the maximum number of tasks to run simultaneously. For unlimited concurrency use Infinity`,
        args: { name: "<number>" },
      },
      {
        name: "--no-bail",
        description: `Don't stop when a task throws an error`,
      },
      {
        name: "--sort",
        description: `Packages are sorted topologically (dependencies before dependents)`,
      },
      {
        name: "--reverse",
        description: `The order of packages is reversed`,
      },
      FILTER_OPTION,
      {
        name: "--include-workspace-root",
        description:
          "When executing commands recursively in a workspace, execute them on the root workspace project as well",
      },
      {
        name: "--shared-workspace-lockfile",
        description:
          "Creates a single pnpm-lock.yaml file in the root of the workspace. A shared lockfile also means that all dependencies of all projects will be in a single node_modules",
      },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "store",
    description: "Managing the package store",
    subcommands: [
      {
        name: "status",
        description: `Checks for modified packages in the store.
Returns exit code 0 if the content of the package is the same as it was at the time of unpacking`,
      },
      {
        name: "add",
        description: `Functionally equivalent to pnpm add,
except this adds new packages to the store directly without modifying any projects or files outside of the store`,
      },
      {
        name: "prune",
        description: `Removes orphan packages from the store.
Pruning the store will save disk space, however may slow down future installations involving pruned packages.
Ultimately, it is a safe operation, however not recommended if you have orphaned packages from a package you intend to reinstall.
Please read the FAQ for more information on unreferenced packages and best practices.
Please note that this is prohibited when a store server is running`,
      },
      {
        name: "path",
        description: `Returns the path to the active store directory`,
      },
    ],
  },
  {
    name: "init",
    description:
      "Creates a basic package.json file in the current directory, if it doesn't exist already",
    options: [
      {
        name: "--init-type",
        description: `Set the type field in package.json`,
        args: { name: "type", suggestions: ["commonjs", "module"] },
      },
      {
        name: "--init-package-manager",
        description: `Set the packageManager field in package.json to the current pnpm version`,
      },
      { name: "--bare", description: `Create a minimal package.json` },
    ],
  },
  {
    name: "completion",
    description: `Print shell completion code for pnpm to stdout`,
    args: {
      name: "shell",
      suggestions: ["bash", "zsh", "fish", "pwsh"],
    },
  },
  {
    name: "pack",
    description: `Create a tarball from a package`,
    options: [
      {
        name: "--pack-destination",
        description: `Directory in which the tarball will be saved`,
        args: { name: "dir", template: "folders" },
      },
      {
        name: "--out",
        description: `Customize the output path for the tarball`,
        args: { name: "path", template: "filepaths" },
      },
      {
        name: "--json",
        description: `Show information in JSON format`,
      },
      {
        name: "--skip-manifest-obfuscation",
        description: `Skip obfuscating the manifest of the packed package`,
      },
      {
        name: ["-r", "--recursive"],
        description: `Pack all packages from the workspace`,
      },
      {
        name: "--workspace-concurrency",
        description: `Set the maximum number of tasks to run simultaneously`,
        args: { name: "number" },
      },
      {
        name: ["-F", "--filter"],
        description:
          'Restricts the scope to package names matching the given pattern. E.g.: foo, "@bar/*"',
      },
      {
        name: "--dry-run",
        description:
          "Does everything `pnpm pack` would do except actually writing the tarball to disk",
      },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: "pack-app",
    description: `Pack a CommonJS entry file into a standalone executable for one or more target platforms using Node.js Single Executable Applications`,
    options: [
      {
        name: "--entry",
        description: `Path to the CJS entry file to embed in the executable`,
        args: { name: "path", template: "filepaths" },
      },
      {
        name: ["-t", "--target"],
        description: `Target platform triplet (e.g. x86_64-unknown-linux-gnu). Can be repeated`,
        args: { name: "triplet" },
      },
      {
        name: "--runtime",
        description: `Node.js version to embed (e.g. node@25.5.0). Requires v25.5+`,
        args: { name: "spec" },
      },
      {
        name: ["-o", "--output-dir"],
        description: `Directory for built executables (defaults to dist-app)`,
        args: { name: "dir", template: "folders" },
      },
      {
        name: "--output-name",
        description: `Executable name without extension (defaults to package name)`,
        args: { name: "name" },
      },
    ],
  },
  {
    name: "stage",
    description: `Stage packages for publishing, deferring proof-of-presence (2FA) to a later point in time`,
    subcommands: [
      {
        name: "publish",
        description: `Stage a package for publishing`,
        args: {
          name: "tarball | dir",
          template: "filepaths",
          isOptional: true,
        },
        options: [
          {
            name: "--tag",
            description: `Tag for the staged package`,
            args: { name: "tag" },
          },
          {
            name: "--access",
            description: `Access level of the staged package`,
            args: {
              name: "access",
              suggestions: ["public", "restricted"],
            },
          },
        ],
      },
      {
        name: "list",
        description: `List staged packages`,
        args: { name: "package-spec", isOptional: true },
      },
      {
        name: "view",
        description: `View details of a staged package`,
        args: { name: "stage-id" },
      },
      {
        name: "approve",
        description: `Approve a staged package (publishes it)`,
        args: { name: "stage-id" },
      },
      {
        name: "reject",
        description: `Reject a staged package`,
        args: { name: "stage-id" },
      },
      {
        name: "download",
        description: `Download the tarball of a staged package`,
        args: { name: "stage-id" },
      },
    ],
    options: [
      {
        name: ["-r", "--recursive"],
        description: "Stage all publishable packages from the workspace",
      },
      {
        name: ["-F", "--filter"],
        description:
          'Restricts the scope to package names matching the given pattern. E.g.: foo, "@bar/*"',
      },
      {
        name: "--dry-run",
        description:
          "Does everything stage publish would do except uploading to the registry",
      },
      {
        name: "--json",
        description:
          "Show information in JSON format for list, view, publish, and download",
      },
      {
        name: "--otp",
        description: "One-time password for approve and reject",
      },
      { name: "--registry", description: "The base URL of the npm registry" },
      {
        name: "--changed-files-ignore-pattern",
        description:
          'Defines files to ignore when filtering for changed projects since the specified commit/branch. Usage example: pnpm --filter="...[origin/master]" --changed-files-ignore- pattern="**/README.md" build',
      },
      {
        name: "--fail-if-no-match",
        description:
          "If no projects are matched by the command, exit with exit code 1 (fail)",
      },
      {
        name: "--filter-prod",
        description:
          "Restricts the scope to package names matching the given pattern similar to --filter, but it ignores devDependencies when searching for dependencies and dependents",
      },
      {
        name: "--test-pattern",
        description:
          'Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: pnpm --filter="...[origin/master]" --test-pattern="test/*" test',
      },
    ],
  },
  {
    name: ["config", "c"],
    description: `Manage the pnpm configuration files`,
    subcommands: [
      {
        name: "set",
        description: `Set the value of a configuration key`,
        args: [{ name: "key" }, { name: "value" }],
      },
      {
        name: "get",
        description: `Print the value of a configuration key`,
        args: { name: "key" },
      },
      {
        name: "delete",
        description: `Delete a configuration key`,
        args: { name: "key" },
      },
      {
        name: "list",
        description: `Print all configuration settings`,
      },
    ],
    options: [
      {
        name: ["-g", "--global"],
        description: `Operate on the global configuration file`,
      },
      {
        name: "--location",
        description: `Configuration scope`,
        args: {
          name: "scope",
          suggestions: ["project", "global"],
        },
      },
      { name: "--json", description: `Output in JSON format` },
    ],
  },
  {
    name: "root",
    description: `Prints the effective modules directory`,
    options: [
      {
        name: ["-g", "--global"],
        description: `Print the global modules directory`,
      },
    ],
  },
  {
    name: "bin",
    description: `Prints the directory into which the executables of dependencies are linked`,
    options: [
      {
        name: ["-g", "--global"],
        description: `Print the global bin directory`,
      },
    ],
  },
  {
    name: "self-update",
    description: `Updates pnpm to the latest version, or the specified one`,
    args: {
      name: "version",
      isOptional: true,
    },
  },
  {
    name: "setup",
    description: `Set up pnpm's home directory, add it to PATH via shell config, and copy the pnpm executable into it`,
    options: [
      {
        name: ["-f", "--force"],
        description: `Override existing PNPM_HOME setup`,
      },
    ],
  },
  {
    name: ["runtime", "rt"],
    description: `Manage runtimes (Node.js, Deno, Bun)`,
    subcommands: [
      {
        name: "set",
        description: `Install the specified version of a runtime (e.g. node, deno, bun)`,
        args: [
          {
            name: "runtime",
            suggestions: ["node", "deno", "bun"],
          },
          { name: "version" },
        ],
        options: [
          {
            name: ["-g", "--global"],
            description: `Install the runtime globally`,
          },
          {
            name: ["-D", "--save-dev"],
            description: `Save the runtime to devEngines.runtime (default)`,
          },
          {
            name: ["-P", "--save-prod"],
            description: `Save the runtime to engines.runtime`,
          },
        ],
      },
    ],
  },
  {
    name: "env",
    description: `Manage Node.js versions (deprecated, use pnpm runtime instead)`,
    subcommands: [
      {
        name: "use",
        description: `Install and use the specified Node.js version`,
        args: { name: "version" },
        options: [
          {
            name: ["-g", "--global"],
            description: `Install globally`,
          },
        ],
      },
      {
        name: ["list", "ls"],
        description: `Print locally installed Node.js versions`,
      },
    ],
  },
  {
    name: "cat-file",
    description: `Prints the contents of a file based on the hash value stored in the index file`,
    args: { name: "hash" },
  },
  {
    name: "cat-index",
    description: `Prints the index file of a specific package from the store`,
    args: { name: "package" },
  },
  {
    name: "find-hash",
    description: `Experimental! Lists the packages that include the file with the specified hash`,
    args: { name: "hash" },
  },
  {
    name: "cache",
    description: `Inspect and manage the metadata cache`,
    subcommands: [
      {
        name: "delete",
        description: `Experimental! Delete metadata cache for the specified package(s). Supports patterns`,
        args: { name: "package", isVariadic: true },
      },
      {
        name: "list",
        description: `Experimental! List the available packages metadata cache. Supports filtering by glob`,
        args: { name: "pattern", isOptional: true },
      },
      {
        name: "list-registries",
        description: `Experimental! List all registries that have their metadata cache locally`,
      },
      {
        name: "view",
        description: `Experimental! View information from the specified package's cache`,
        args: { name: "package" },
      },
    ],
  },
  {
    name: ["view", "info", "show", "v"],
    description: `View package information from the registry`,
    args: [
      { name: "package-name" },
      { name: "field", isOptional: true, isVariadic: true },
    ],
    options: [
      { name: "--json", description: `Show information in JSON format` },
    ],
  },
  {
    name: ["search", "s", "se", "find"],
    description: `Search for packages in the registry`,
    args: {
      name: "keyword",
      isVariadic: true,
    },
    options: [
      { name: "--json", description: `Show search results in JSON format` },
      {
        name: "--search-limit",
        description: `Maximum number of results to show (default: 20)`,
        args: { name: "number" },
      },
    ],
  },
  {
    name: ["login", "adduser"],
    description: `Log in to an npm registry`,
    options: [
      {
        name: "--registry",
        description: `The registry to log in to`,
        args: { name: "url" },
      },
      {
        name: "--scope",
        description: `Associate the login token with a package scope and record the scope-to-registry mapping`,
        args: { name: "scope" },
      },
    ],
  },
  {
    name: "logout",
    description: `Log out from a registry`,
    options: [
      {
        name: "--registry",
        description: `The registry to log out from`,
        args: { name: "url" },
      },
    ],
  },
  {
    name: "whoami",
    description: `Display the pnpm username of the currently logged in user`,
  },
  {
    name: "ping",
    description: `Test connectivity to the configured registry`,
    options: [
      {
        name: "--registry",
        description: `Test a specific registry URL`,
        args: { name: "url" },
      },
    ],
  },
  {
    name: ["dist-tag", "dist-tags"],
    description: `Modify package distribution tags`,
    subcommands: [
      {
        name: ["add", "set"],
        description: `Tag the specified version of the package with the given tag, or the --tag config if not specified. Default tag is "latest"`,
        args: [{ name: "package@version" }, { name: "tag", isOptional: true }],
      },
      {
        name: ["rm", "remove"],
        description: `Remove a tag from the package, defaulting to the tag named "latest"`,
        args: [{ name: "package" }, { name: "tag", isOptional: true }],
      },
      {
        name: ["ls", "list"],
        description: `Show all of the dist-tags for a package, defaulting to the package in the current prefix`,
        args: { name: "package", isOptional: true },
      },
    ],
    options: [
      {
        name: "--registry",
        description: `Registry URL`,
        args: { name: "url" },
      },
      {
        name: "--otp",
        description: `One-time password for two-factor authentication`,
        args: { name: "code" },
      },
    ],
  },
  {
    name: "deprecate",
    description: `Mark a package version (or version range) as deprecated`,
    args: [{ name: "package[@version]" }, { name: "message" }],
    options: [
      {
        name: "--registry",
        description: `Registry URL`,
        args: { name: "url" },
      },
      {
        name: "--otp",
        description: `One-time password for two-factor authentication`,
        args: { name: "code" },
      },
    ],
  },
  {
    name: "undeprecate",
    description: `Undeprecate a package version (or version range)`,
    args: { name: "package[@version]" },
    options: [
      {
        name: "--registry",
        description: `Registry URL`,
        args: { name: "url" },
      },
      {
        name: "--otp",
        description: `One-time password for two-factor authentication`,
        args: { name: "code" },
      },
    ],
  },
  {
    name: "unpublish",
    description: `Remove a package version from the registry`,
    args: { name: "package[@version]", isOptional: true },
    options: [
      {
        name: "--force",
        description: `Force unpublish even if it would break dependents`,
      },
      {
        name: "--registry",
        description: `Registry URL`,
        args: { name: "url" },
      },
      {
        name: "--otp",
        description: `One-time password for two-factor authentication`,
        args: { name: "code" },
      },
    ],
  },
  {
    name: "version",
    description: `Bump the package version`,
    args: {
      name: "newversion | bump",
      suggestions: [
        "major",
        "minor",
        "patch",
        "premajor",
        "preminor",
        "prepatch",
        "prerelease",
      ],
    },
    options: [
      {
        name: "--no-git-checks",
        description: `Skip checks for clean working tree and up-to-date branch`,
      },
      {
        name: "--preid",
        description: `Identifier used for pre-release versions`,
        args: { name: "preid" },
      },
      {
        name: "--tag-version-prefix",
        description: `Version prefix used for the tag (default "v")`,
        args: { name: "prefix" },
      },
      {
        name: "--allow-same-version",
        description: `Don't error if the new version is the same as the current one`,
      },
      {
        name: "--message",
        description: `Commit message template`,
        args: { name: "message" },
      },
      { name: "--no-git-tag-version", description: `Don't tag the commit` },
      { name: "--no-commit-hooks", description: `Bypass git commit hooks` },
      { name: "--sign-git-tag", description: `Sign the git tag` },
      { name: "--json", description: `Output in JSON format` },
      FILTER_OPTION,
      {
        name: "--recursive",
        description: "Apply command to all packages in workspace",
      },
    ],
  },
  {
    name: "star",
    description: `Mark a package as a favorite`,
    args: { name: "package" },
  },
  {
    name: "unstar",
    description: `Remove a package from your favorites`,
    args: { name: "package" },
  },
  {
    name: "stars",
    description: `List all packages starred by a specific user (or the current user if no argument)`,
    args: { name: "user", isOptional: true },
  },
  {
    name: ["docs", "home"],
    description: `Open the documentation of a package`,
    args: { name: "package-name" },
  },
  {
    name: "bugs",
    description: `Open the bug tracker URL of a package in a web browser`,
    args: { name: "package-name", isOptional: true },
  },
  {
    name: "repo",
    description: `Open the repository URL of a package in a web browser`,
    args: { name: "package-name", isOptional: true },
  },
  {
    name: ["owner", "owners"],
    description: `Manage package owners`,
    subcommands: [
      {
        name: ["ls", "list"],
        description: `List package owners`,
        args: { name: "package" },
      },
      {
        name: "add",
        description: `Add a new owner to a package`,
        args: [{ name: "user" }, { name: "package" }],
      },
      {
        name: ["rm", "remove"],
        description: `Remove an owner from a package`,
        args: [{ name: "user" }, { name: "package" }],
      },
    ],
    options: [
      {
        name: "--registry",
        description: `Registry URL`,
        args: { name: "url" },
      },
      {
        name: "--otp",
        description: `One-time password for two-factor authentication`,
        args: { name: "code" },
      },
    ],
  },
  {
    name: "pkg",
    description: `Manage your package.json file`,
    subcommands: [
      {
        name: "get",
        description: `Print the value of a key in package.json`,
        args: { name: "key", isOptional: true, isVariadic: true },
      },
      {
        name: "set",
        description: `Set the value of a key in package.json`,
        args: { name: "key=value", isVariadic: true },
      },
      {
        name: "delete",
        description: `Delete a key from package.json`,
        args: { name: "key", isVariadic: true },
      },
      {
        name: "fix",
        description: `Fix invalid or out-of-date values in package.json`,
      },
    ],
    options: [
      { name: "--json", description: `Output values in JSON format` },
      {
        name: ["-r", "--recursive"],
        description: `Apply across all workspace packages`,
      },
    ],
  },
];

const subcommands = [
  ...SUBCOMMANDS_MANAGE_DEPENDENCIES,
  ...SUBCOMMANDS_REVIEW_DEPS,
  ...SUBCOMMANDS_RUN_SCRIPTS,
  ...SUBCOMMANDS_MISC,
];

const recursiveSubcommandsNames = [
  "add",
  "audit",
  "dlx",
  "exec",
  "install",
  "licenses",
  "list",
  "outdated",
  "pack",
  "patch",
  "publish",
  "rebuild",
  "remove",
  "run",
  "test",
  "unlink",
  "update",
  "why",
];

const recursiveSubcommands = subcommands.filter((subcommand) => {
  if (Array.isArray(subcommand.name)) {
    return subcommand.name.some((name) =>
      recursiveSubcommandsNames.includes(name)
    );
  }
  return recursiveSubcommandsNames.includes(subcommand.name);
});

// RECURSIVE SUBCOMMAND INDEX
SUBCOMMANDS_MISC[1].subcommands = recursiveSubcommands;

// common options
const COMMON_OPTIONS: Fig.Option[] = [
  {
    name: ["-C", "--dir"],
    args: {
      name: "path",
      template: "folders",
    },
    isPersistent: true,
    description:
      "Run as if pnpm was started in <path> instead of the current working directory",
  },
  {
    name: ["-w", "--workspace-root"],
    args: {
      name: "workspace",
    },
    isPersistent: true,
    description:
      "Run as if pnpm was started in the root of the <workspace> instead of the current working directory",
  },
  {
    name: ["-h", "--help"],
    isPersistent: true,
    description: "Output usage information",
  },
  {
    name: ["-v", "--version"],
    description: "Show pnpm's version",
  },
];

// SPEC
const completionSpec: Fig.Spec = {
  name: "pnpm",
  description: "Fast, disk space efficient package manager",
  args: {
    name: "Scripts",
    filterStrategy: "fuzzy",
    generators: npmScriptsGenerator,
    isVariadic: true,
  },
  filterStrategy: "fuzzy",
  generateSpec: async (tokens, executeShellCommand) => {
    const { script, postProcess } = dependenciesGenerator as Fig.Generator & {
      script: string[];
    };

    if (postProcess === undefined) {
      return undefined;
    }

    const packages = postProcess(
      (
        await executeShellCommand({
          command: script[0],
          args: script.slice(1),
        })
      ).stdout,
      tokens
    )
      ?.filter((e) => e !== null)
      .map(({ name }) => name as string);

    const subcommands = packages
      ?.filter((name) => nodeClis.has(name))
      .map((name) => ({
        name,
        loadSpec: name,
        icon: "fig://icon?type=package",
      }));

    return {
      name: "pnpm",
      subcommands,
    } as Fig.Spec;
  },
  subcommands,
  options: COMMON_OPTIONS,
};

export default completionSpec;
