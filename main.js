objects = [];
estatus = "";

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.position(375,150);

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objetos";
    object_name=document.getElementById("objeto").value
}

function modelLoaded()
{
    console.log("¡Modelo cargado!")
    estatus = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 640, 420);

    if(estatus != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Estatus: objeto detectado";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label==object_name)
            {video.stop()
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML=object_name+"encontrado";
            }
            else{document.getElementById("object_status").innerHTML=object_name+"no encontrado";}
        }
    }

}