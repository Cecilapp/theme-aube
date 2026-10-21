<?php
// Links the repository as `demo/themes/aube`, so the demo site uses the theme under development,
// and installs the FlexSearch component theme in `demo/themes/flexsearch`.
$themes = __DIR__ . DIRECTORY_SEPARATOR . 'themes';
@mkdir($themes, 0777, true);
$code = 0;

$target = dirname(__DIR__);
$link = $themes . DIRECTORY_SEPARATOR . 'aube';
if (file_exists($link)) {
    echo "Link already exists: $link\n";
} else {
    if (PHP_OS_FAMILY === 'Windows') {
        exec(sprintf('mklink /J %s %s', escapeshellarg($link), escapeshellarg($target)), $output, $code);
    } else {
        $code = symlink('../..', $link) ? 0 : 1;
    }
    echo $code === 0 ? "Linked $link -> $target\n" : "Unable to create $link\n";
}

$flexsearch = $themes . DIRECTORY_SEPARATOR . 'flexsearch';
if (file_exists($flexsearch)) {
    echo "Theme already installed: $flexsearch\n";
} else {
    passthru(sprintf('git clone --quiet --depth 1 https://github.com/Cecilapp/theme-flexsearch.git %s', escapeshellarg($flexsearch)), $cloneCode);
    echo $cloneCode === 0 ? "Installed $flexsearch\n" : "Unable to install $flexsearch\n";
    $code = $code ?: $cloneCode;
}

exit($code);
