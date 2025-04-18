{pkgs ? import <nixpkgs> {}}: let
  phpWithExtensions = pkgs.php.buildEnv {
    extensions = {
      enabled,
      all,
    }:
      enabled
      ++ (with all; [
        xdebug
        imagick
        redis
      ]);
  };
  composer = phpWithExtensions.packages.composer;
  sailArtisan = pkgs.writeScriptBin "artisan" ''
    if [ -f ./vendor/bin/sail ]; then
        ./vendor/bin/sail artisan "$@"
    else
        ${phpWithExtensions}/bin/php artisan "$@"
    fi
  '';
  sailComposer = pkgs.writeScriptBin "composer" ''
    if [ -f ./vendor/bin/sail ]; then
        ./vendor/bin/sail composer "$@"
    else
        ${composer}/bin/composer "$@"
    fi
  '';
  sailTinker = pkgs.writeScriptBin "tinker" ''
    if [ -f ./vendor/bin/sail ]; then
        ./vendor/bin/sail tinker
    else
        ${phpWithExtensions}/bin/php artisan tinker
    fi
  '';
in
  pkgs.mkShell {
    COREPACK_ENABLE_STRICT = 0;
    COREPACK_ENABLE_AUTO_PIN = 0;
    COREPACK_ENABLE_PROJECT_SPEC = 0;

    nativeBuildInputs = with pkgs.buildPackages; [
      # PHP
      phpWithExtensions
      sailComposer
      sailArtisan
      sailTinker

      # Node
      nodejs_20
      corepack_20
      bun

      # Python
      python311
      python311Packages.cmake
    ];
  }
