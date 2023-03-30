/*
* Reglas:
* El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '💀',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'K': '🏆',
    'HEART': '❤️',
    1 :'Y',
    2 :'O',
    3 :'U',
    4 :'W',
    5 :'I',
    6 :'N',
};

const maps = [];
    maps.push(`
        IXXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        OXXXXXXXXX
    `);
    maps.push(`
O--XXXXXXX
X--XXXXXXX
XX----XXXX
X--XX-XXXX
X-XXX--XXX
X-XXXX-XXX
XX--XX--XX
XX--XXX-XX
XXXX---IXX
XXXXXXXXXX
    `);
    maps.push(`
        I-----XXXX
        XXXXX-XXXX
        XX----XXXX
        XX-XXXXXXX
        XX-----XXX
        XXXXXX-XXX
        XX-----XXX
        XX-XXXXXXX
        XX-----OXX
        XXXXXXXXXX
    `);
    maps.push(`
        ----------
        ----------
        ----------
        --KKKKK---
        --K456K---
        --KKKKK---
        ----------
        ----------
        ----------
        ----------
    `);
