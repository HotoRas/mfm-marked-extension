export declare namespace MfmExtension {
    // https://marked.js.org/using_pro#custom-extensions-example
}

/*
$[tada.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; font-size: 1.5rem; animation: $1 linear $2 infinite both global-tada;">mfm...</span>

$[jelly.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite both mfm-rubberBand;">mfm...</span>

$[twitch.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 $2 infinite mfm-twitch;">mfm...</span>

$[shake.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 $2 infinite mfm-shake;">mfm...</span>

$[shake.speed=$1,delay=$2,$3 mfm...] where $1 defaults 5s and $3 in [alternate, left, x, y]
<span style="display: inline-block; animation: $1 linear $2 infinite $3 mfm-spin;">mfm...</span>

$[jump.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite mfm-jump;">mfm...</span>

$[bounce.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite mfm-bounce; transform-origin: center bottom 0px;">mfm...</span>

$[flip.h? mfm...]
<span style="display: inline-block; transform: scaleX(-1);">mfm...</span>

$[flip.v mfm...]
<span style="display: inline-block; transform: scaleY(-1);">mfm...</span>

$[flip.h,v mfm...]
<span style="display: inline-block; transform: scale(-1);">mfm...</span>

x2, x3, x4 => x$1 => <span style="display: inline-block; transform: scale($1); overflow-wrap: anywhere;">...</span

$[scale.x=$1,y=$2 mfm...] where -5<=$1<=5 defaults 1 and -5<=$2<=5 defaults 1
<span style="display: inline-block; transform: scale($1,$2);">mfm...</span>

$[position.x=$1,y=$2 mfm...] where $1 defaults 1 and $2 defaults 1
<span style="display: inline-block; transform: translate($1em,$2em);">mfm...</span>

$[fg.color=$1 mfm...] where $1 is hex or color-class defaults red
<span style="display: inline-block; color: $1; overflow-wrap: anywhere;">mfm...</span>

$[bg.color=$1 mfm...] where $1 is hex or color-class defaults red
<span style="display: inline-block; background-color: $1; overflow-wrap: anywhere;">mfm...</span>

$[border.width=$1,color=$2,style=$3,radius=$4,$5 mfm...] where
$1 defaults 1,
$2 defaults var(--accent),
$3 defaults solid,
$4 defaults 1
and $5 in [noclip, undefined]
then if $5 is undefined
<span style="display: inline-block; border: $1 $2 $3; border-radius: $4; overflow: clip;">mfm...</span>
else
<span style="display: inline-block; border: $1 $2 $3; border-radius: $4;>mfm...</span>

$[blur mfm...]
<span class="_mfm_blur_">mfm...</span>

$[rainbow.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite mfm-rainbow;">mfm...</span>

$[sparkle mfm...] is JS animation, unavaliable to render with pure markup
<span class="mfm_sparkle_wrapper"><span style="display: inline-block;">mfm...</span><span>

$[rotate.deg=$1 mfm...] where $1 defaults 90
<span style="display: inline-block; transform: rotate($1deg); transform-origin: center center 0px;">mfm...</span>

$[ruby $1 $2] where seperator is 20h (whitespace)
<ruby>$1<rt>$2</rt></ruby>
 */