// Skill-test question bank: 5 stacks x 10 MCQs. Sample data for demo.
export interface Question {
  q: string;
  options: string[];
  answer: number; // index of correct option
  why: string;
}

export const QUESTIONS: Record<string, Question[]> = {
  Laravel: [
    { q: 'Which Artisan command creates a new controller?', options: ['php artisan make:controller', 'php artisan new:controller', 'php artisan controller:make', 'composer make controller'], answer: 0, why: 'make:controller scaffolds a controller class.' },
    { q: 'Where are web routes defined?', options: ['routes/web.php', 'app/routes.php', 'config/routes.php', 'public/index.php'], answer: 0, why: 'routes/web.php holds web routes with session state.' },
    { q: 'What does Eloquent map to PHP objects?', options: ['Database tables', 'Blade views', 'Queue jobs', 'Cache keys'], answer: 0, why: 'Each Eloquent model maps to one database table.' },
    { q: 'Which Blade directive loops over an array?', options: ['@foreach', '@loop', '@each', '@iterate'], answer: 0, why: '@foreach renders a block per array item.' },
    { q: 'How do you validate request data in a controller?', options: ["$request->validate([...])", '$request->check([...])', 'Validator::run($request)', '$this->clean($request)'], answer: 0, why: 'validate() throws and redirects back on failure.' },
    { q: 'What is a migration?', options: ['Version control for the DB schema', 'A deployment script', 'A backup tool', 'A seeding library'], answer: 0, why: 'Migrations version your database schema over time.' },
    { q: 'Which command starts the dev server?', options: ['php artisan serve', 'php artisan start', 'laravel run', 'composer serve'], answer: 0, why: 'artisan serve boots PHP’s built-in server.' },
    { q: 'What does `php artisan migrate:fresh` do?', options: ['Drops all tables and re-runs migrations', 'Only rolls back one step', 'Exports the schema', 'Seeds without migrating'], answer: 0, why: 'Fresh drops everything, then migrates from scratch.' },
    { q: 'Where do environment variables live?', options: ['.env file', 'config/app.php only', '.htaccess', 'composer.json'], answer: 0, why: '.env holds per-environment config.' },
    { q: 'A Post has many Comments. The relation on Post is…', options: ['hasMany', 'belongsTo', 'hasOne', 'morphsTo'], answer: 0, why: 'hasMany = one parent, many children.' },
  ],
  React: [
    { q: 'Which hook manages component state?', options: ['useEffect', 'useState', 'useMemo', 'useRef'], answer: 1, why: 'useState returns [value, setter].' },
    { q: 'What is useEffect for?', options: ['Side effects after render', 'Styling components', 'Routing pages', 'Form validation'], answer: 0, why: 'Fetching, subscriptions, timers live in effects.' },
    { q: 'Why do list items need keys?', options: ['To identify changed items efficiently', 'For CSS styling', 'To enable routing', 'For SEO ranking'], answer: 0, why: 'Keys let React reconcile lists cheaply.' },
    { q: 'JSX compiles down to…', options: ['React.createElement calls', 'HTML strings', 'CSS modules', 'Web Components'], answer: 0, why: 'Babel turns JSX into createElement calls.' },
    { q: '"Lifting state up" means…', options: ['Moving state to the closest common parent', 'Deleting unused state', 'Using global variables', 'Copying props down'], answer: 0, why: 'Shared state lives in the common ancestor.' },
    { q: 'useRef is commonly used to…', options: ['Access a DOM node directly', 'Fetch data', 'Memoize values', 'Create context'], answer: 0, why: 'Refs hold mutable values without re-renders.' },
    { q: 'What triggers a re-render?', options: ['State or props change', 'CSS change', 'Console.log', 'File save'], answer: 0, why: 'React re-renders when state/props change.' },
    { q: 'The Context API mainly solves…', options: ['Prop drilling', 'Slow builds', 'Bundle size', 'Type errors'], answer: 0, why: 'Context passes data without threading props.' },
    { q: 'A controlled input is one where…', options: ['Its value is driven by React state', 'It uses uncontrolled refs', 'It is disabled', 'It validates itself'], answer: 0, why: 'value + onChange = controlled.' },
    { q: 'React.memo does what?', options: ['Skips re-render if props are unchanged', 'Memoizes API calls', 'Caches routes', 'Compresses images'], answer: 0, why: 'It shallow-compares props to bail out.' },
  ],
  'Node.js': [
    { q: 'Node.js is built on which JS engine?', options: ['SpiderMonkey', 'V8', 'JavaScriptCore', 'Chakra'], answer: 1, why: 'V8 powers Chrome and Node.' },
    { q: 'What is the event loop?', options: ['Handles async work on a single thread', 'A for-loop helper', 'A testing tool', 'A package manager'], answer: 0, why: 'It schedules async callbacks non-blockingly.' },
    { q: 'require() belongs to which module system?', options: ['ES Modules', 'CommonJS', 'AMD', 'UMD'], answer: 1, why: 'CommonJS is Node’s original module format.' },
    { q: 'What does package-lock.json do?', options: ['Locks exact dependency versions', 'Lists dev scripts', 'Caches npm downloads', 'Stores secrets'], answer: 0, why: 'It pins the full dependency tree.' },
    { q: 'Express middleware signature is…', options: ['(req, res, next)', '(err, req)', '(app, port)', '(router, path)'], answer: 0, why: 'Middleware receives req, res and next().' },
    { q: 'Which reads a file asynchronously?', options: ['fs.readFileSync', 'fs.readFile', 'fs.open', 'path.read'], answer: 1, why: 'fs.readFile is non-blocking with a callback.' },
    { q: '`npm start` runs…', options: ['The "start" script in package.json', 'server.js always', 'index.ts always', 'A Docker build'], answer: 0, why: 'npm maps start to the scripts.start entry.' },
    { q: 'What is process.env?', options: ['Environment variables', 'CPU usage stats', 'Event emitters', 'Child processes'], answer: 0, why: 'It exposes the process environment.' },
    { q: 'Streams are best for…', options: ['Handling large data in chunks', 'Sync file writes', 'Parsing JSON', 'Hashing passwords'], answer: 0, why: 'Streams process data piece by piece.' },
    { q: 'What does `node --watch` do?', options: ['Restarts the app on file changes', 'Watches CPU usage', 'Enables debugging', 'Minifies code'], answer: 0, why: 'Watch mode auto-restarts on edits.' },
  ],
  Python: [
    { q: 'Which keyword defines a function?', options: ['func', 'def', 'function', 'lambda-only'], answer: 1, why: 'def name(): starts a function.' },
    { q: 'What is a list comprehension?', options: ['A compact way to build lists', 'A sorting algorithm', 'A type of loop keyword', 'A docstring format'], answer: 0, why: '[x for x in items] builds lists inline.' },
    { q: 'pip is used to…', options: ['Install packages', 'Run tests', 'Format code', 'Create venvs'], answer: 0, why: 'pip installs from PyPI.' },
    { q: 'What does `if __name__ == "__main__":` do?', options: ['Runs code only when the script is executed directly', 'Imports all modules', 'Starts a web server', 'Defines main()'], answer: 0, why: 'It guards script-vs-import execution.' },
    { q: 'Which of these is immutable?', options: ['list', 'dict', 'tuple', 'set'], answer: 2, why: 'Tuples cannot be changed after creation.' },
    { q: 'What is a decorator?', options: ['A function that wraps another function', 'A CSS-like style', 'A class variable', 'A comment style'], answer: 0, why: '@dec modifies/wraps the function below it.' },
    { q: 'How do you open a file for reading?', options: ['open("f.txt", "r")', 'read("f.txt")', 'file.open("f.txt")', 'open.read("f.txt")'], answer: 0, why: '"r" mode = read.' },
    { q: 'What does len() return?', options: ['The number of items', 'The memory size', 'The last item', 'The data type'], answer: 0, why: 'len() counts items in a sequence.' },
    { q: 'A virtualenv is used to…', options: ['Isolate project dependencies', 'Speed up Python', 'Compile to binary', 'Share code online'], answer: 0, why: 'Venvs keep project packages separate.' },
    { q: 'Which loop iterates over a list directly?', options: ['for item in my_list:', 'while my_list:', 'loop my_list:', 'each my_list:'], answer: 0, why: 'for…in iterates any iterable.' },
  ],
  Flutter: [
    { q: 'Flutter apps are written in…', options: ['Kotlin', 'Dart', 'Swift', 'Java'], answer: 1, why: 'Dart is Flutter’s language.' },
    { q: 'StatefulWidget vs StatelessWidget?', options: ['Stateful can change over time', 'Stateless is faster always', 'Stateful has no build()', 'No real difference'], answer: 0, why: 'StatefulWidget holds mutable State.' },
    { q: 'What does build() return?', options: ['The widget tree', 'A JSON string', 'A future', 'A route name'], answer: 0, why: 'build() describes the UI as widgets.' },
    { q: 'Hot reload does what?', options: ['Updates UI without losing app state', 'Reinstalls the app', 'Clears the cache', 'Rebuilds native code'], answer: 0, why: 'It injects new code into the running VM.' },
    { q: 'Which widget stacks children vertically?', options: ['Row', 'Column', 'Stack', 'Wrap'], answer: 1, why: 'Column = vertical layout.' },
    { q: 'Navigator.push is used to…', options: ['Open a new screen', 'Pop a dialog', 'Refresh data', 'Close the app'], answer: 0, why: 'Push adds a route to the stack.' },
    { q: 'Calling setState()…', options: ['Triggers a rebuild of the widget', 'Saves to disk', 'Navigates back', 'Disposes the widget'], answer: 0, why: 'setState marks the widget dirty.' },
    { q: 'pubspec.yaml contains…', options: ['Dependencies and assets', 'Native code', 'Test results', 'API keys only'], answer: 0, why: 'It declares packages, fonts and assets.' },
    { q: 'In Flutter, everything in the UI is a…', options: ['Widget', 'Activity', 'View', 'Component'], answer: 0, why: 'Widgets compose the entire UI.' },
    { q: 'FutureBuilder is used to…', options: ['Render UI from async snapshots', 'Build forms', 'Animate widgets', 'Handle gestures'], answer: 0, why: 'It rebuilds when a Future completes.' },
  ],
};

export const STACKS = Object.keys(QUESTIONS);
export const TEST_MINUTES = 15;
export const PASS_SCORE = 70;
