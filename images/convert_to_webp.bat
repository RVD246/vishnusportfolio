@echo off
setlocal enabledelayedexpansion

echo Converting all images to WebP (quality 80)...
echo.

set count=0

for /r %%f in (*.jpg *.jpeg *.png) do (
    set "name=%%~nf"
    set "ext=%%~xf"
    set "dir=%%~dpf"
    set "fullname=%%~nxf"

    rem Skip if already a webp or if source is a webp
    if /i not "!ext!"==".webp" (
        rem Skip keyart/cover only if you want — remove these lines to convert those too
        magick "%%f" -quality 80 "%%~dpnf.webp"

        if exist "%%~dpnf.webp" (
            del "%%f"
            echo Converted: %%f
            set /a count+=1
        ) else (
            echo FAILED:    %%f
        )
    )
)

echo.
echo Done. Converted !count! file(s).
pause
