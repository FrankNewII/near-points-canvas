document.addEventListener('DOMContentLoaded', function () {
    let canvElm = document.getElementById('nearPointsCanvas');
    canvElm.setAttribute('width', window.innerWidth * 2);
    canvElm.setAttribute('height', window.innerHeight * 2);

    let ctx = canvElm.getContext('2d');

    const elms = [];
    const lines = [];
    const width = canvElm.offsetWidth * 2;
    const height = canvElm.offsetHeight * 2;
    let pointsToInit = 500;

    while (pointsToInit--) {
        elms.push(
            [
                Math.floor(Math.random() * width),
                Math.floor(Math.random() * height)
            ]);
    }

    function draw() {
        ctx.fillStyle = '#09270c';
        ctx.fillRect(0, 0, width, height );

        ctx.fillStyle = '#166f41';
        ctx.strokeStyle = '#09621f';
        ctx.lineWidth = .5;


        if (lines.length) {

            let linesCount = 5;

            while(--linesCount) {





                let nearestPoints = 1;

                while(nearestPoints < 6 ) {

                    ctx.beginPath();

                    ctx.moveTo(lines[linesCount][0], lines[linesCount][1]);

                    ctx.lineTo(lines[linesCount * 5 + nearestPoints][0], lines[linesCount * 5 + nearestPoints][1]);

                    ctx.stroke();

                    nearestPoints++;
                }
            }


        }


        elms.forEach(p => {
            ctx.fillRect(p[0], p[1], 4, 4);
            //pointMove(p);
        });
        window.requestAnimationFrame(draw);
    }

    function pointMove(point) {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;

        point[0] = point[0] + x;
        point[1] = point[1] + y;
    }

    canvElm.onmousemove = function (event) {
        let x = event.x * 2;
        let y = event.y * 2;

        lines.length = 0;
        let linesCount = 0;

        while (linesCount <= 4) {

            lines.push(nearestPoint(x, y, lines));

            linesCount++;
        }

        linesCount = 0;

        while (linesCount <= 4) {
            let p2 = lines[linesCount];

            let fromPoint = 0;

            while (fromPoint <= 4) {
                lines.push(nearestPoint(p2[0], p2[1], lines));
                fromPoint++;
            }


            linesCount++;
        }
    };

    function nearestPoint(x, y, without) {
        let minDist = Infinity;
        let nearest = null;

        elms.forEach(p => {

            if (p[0] !== x && p[1] !== y && without.indexOf(p) === -1) {
                let dist = Math.sqrt((p[0] - x) ** 2 + (p[1] - y) ** 2);

                if (minDist > dist) {
                    minDist = dist;
                    nearest = p;
                }
            }

        });

        return nearest;
    }

    draw();
});


