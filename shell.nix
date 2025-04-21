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
  testbench = pkgs.writeScriptBin "testbench" ''
    ${phpWithExtensions}/bin/php vendor/bin/testbench "$@"
  '';
  workbench = pkgs.writeScriptBin "testbench" ''
    ${phpWithExtensions}/bin/php vendor/bin/workbench "$@"
  '';
  canvas = pkgs.writeScriptBin "canvas" ''
    ${phpWithExtensions}/bin/php vendor/bin/canvas "$@"
  '';
in
  pkgs.mkShell {
    COREPACK_ENABLE_STRICT = 0;
    COREPACK_ENABLE_AUTO_PIN = 0;
    COREPACK_ENABLE_PROJECT_SPEC = 0;

    nativeBuildInputs = with pkgs.buildPackages; [
      # PHP
      phpWithExtensions
      composer
      testbench
      workbench
      canvas

      # Node
      nodejs_20
      corepack_20
      bun

      # Python
      python311
      python311Packages.cmake
    ];
  }
