let hitama = 40;

//hanabi();
function hanabi(x, z)
{
    let hinoObj = new Array(hitama);

    let hinoPos = new Array(hitama); //１個の火の玉の座標
    let hinoRot = new Array(hitama); //角度
    let hinoVec = new Array(hitama); //速さ

    // 爆発する座標
    let bomPosX = x;
    let bomPosY = 5 + ( Math.floor(Math.random() * 10) - 5);
    let bomPosZ = z;


    for(let i = 0; i < hitama; i++)
    {
        hinoPos[i] = new Array(3);
        hinoPos[i][0] = bomPosX;
        hinoPos[i][1] = bomPosY - 20;
        hinoPos[i][2] = bomPosZ;

        hinoVec[i] = new Array(3);
        hinoRot[i] = new Array(3);
        for(let j = 0; j < 3; j++)
        {
            hinoVec[i][j] = 1;

            hinoRot[i][j] = Math.floor(Math.random() * 360);
            hinoRot[i][j] = (hinoRot[i][j] / 180) * Math.PI;
        }

        let kaitenZ = hinoVec[i]
        hinoVec[i][0] = (Math.cos(hinoRot[i][2]) * kaitenZ[0]) + (Math.sin(hinoRot[i][2]) * kaitenZ[1]); // x
        hinoVec[i][1] = -(Math.sin(hinoRot[i][2]) * kaitenZ[0]) + (Math.cos(hinoRot[i][2]) * kaitenZ[1]);  // y
        hinoVec[i][2] = kaitenZ[2]; // z

        let kaitenY = hinoVec[i];
        hinoVec[i][0] = (Math.cos(hinoRot[i][1]) * kaitenY[0]) - (Math.sin(hinoRot[i][1]) * kaitenY[2]); // x
        hinoVec[i][1] = kaitenY[1];  // y
        hinoVec[i][2] = (Math.sin(hinoRot[i][1]) * kaitenY[0]) + (Math.cos(hinoRot[i][1]) * kaitenY[2]); // z

        let mag = Math.sqrt( ( hinoVec[i][0] * hinoVec[i][0] ) + 
                            ( hinoVec[i][1] * hinoVec[i][1] ) + 
                            ( hinoVec[i][2] * hinoVec[i][2] ) );
        hinoVec[i][0] = hinoVec[i][0] / mag;
        hinoVec[i][1] = hinoVec[i][1] / mag;
        hinoVec[i][2] = hinoVec[i][2] / mag;


        hinoObj[i] = document.createElement('a-sphere');
        hinoObj[i].setAttribute('color', 'red');
        hinoObj[i].setAttribute('opacity', '0.5');
        hinoObj[i].setAttribute('position', hinoPos[i][0] + ' ' + hinoPos[i][1] + ' ' + hinoPos[i][2]);
        hinoObj[i].setAttribute('scale', '0.1 0.1 0.1');
                
        document.querySelector('a-scene').appendChild(hinoObj[i]);
    }

    document.addEventListener('DOMContentLoaded', function()
    {
        let time;
        let bom = 0;
        let upSpeed = Math.floor( Math.random() * 10) / 100;
        let bomspeed = 0.1;
        let sa = 2;
        let upMove = function()
        {
            if(bom == 0)
            {
                for(let i = 0; i < hitama; i++)
                {
                    hinoPos[i][1] = hinoPos[i][1] + upSpeed;
                }
                if(hinoPos[0][1] >= bomPosY)
                {
                    bom = 1;
                    time = new Date();
                }
                requestAnimationFrame(upMove.bind(null));
                for(let i = 0; i < hitama; i++)
                {
                    hinoObj[i].setAttribute('position', hinoPos[i][0] + ' ' + hinoPos[i][1] + ' ' + hinoPos[i][2]);
                }
            }
            else if(bom == 1)
            {
                if( new Date().getSeconds() - time.getSeconds() >= sa)
                {
                    for(let i = 0; i < hitama; i++)
                    {
                        document.querySelector('a-scene').removeChild(hinoObj[i]);
                    }
                }
                else
                {
                    for(let i = 0; i < hitama; i++)
                    {
                        for(let j = 0; j < 3; j++)
                        {
                            hinoPos[i][j] = hinoPos[i][j] + ( hinoVec[i][j] * bomspeed);
                        }
                    }
                }
                requestAnimationFrame(upMove.bind(null));
                for(let i = 0; i < hitama; i++)
                {
                    hinoObj[i].setAttribute('position', hinoPos[i][0] + ' ' + hinoPos[i][1] + ' ' + hinoPos[i][2]);
                }
            }
            
        }
        upMove();
    });
}