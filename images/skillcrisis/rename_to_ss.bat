@echo off
setlocal enabledelayedexpansion

set count=1

for %%f in (*.jpg *.jpeg *.png *.webp *.bmp *.tiff *.tga) do (
    set "name=%%~nf"
    set "ext=%%~xf"

    rem Skip keyart and cover
    if /i not "!name!"=="keyart" (
        if /i not "!name!"=="cover" (
            ren "%%f" "ss!count!!ext!"
            echo Renamed: %%f  -^>  ss!count!!ext!
            set /a count+=1
        )
    )
)

echo.
echo Done. Renamed !count! file(s).
pause
