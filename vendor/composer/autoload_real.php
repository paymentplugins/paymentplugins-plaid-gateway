<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitbe2f0bd3a62666d4ba05eb2cb0ac3274
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInitbe2f0bd3a62666d4ba05eb2cb0ac3274', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitbe2f0bd3a62666d4ba05eb2cb0ac3274', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitbe2f0bd3a62666d4ba05eb2cb0ac3274::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}