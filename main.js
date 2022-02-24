object = [];
stat = "";
object_name = document.getElementById("something").value;


function setup()
{
    canvas = createCanvas(380 ,380);
    canvas. center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("stat").innerHTML = "Status: Object Detection";

}
function modelLoaded()
{
    console.log("Model Loaded");
    stat = true ;
    
}
function gotResult(error ,results);
{
    if(error)
    {console.log(error);
    }
    console.log(results);
    object = results;
}
function draw()
{
    image(video ,0 ,0 ,380 ,380);
    if(stat != "")
    {
        objectDetector.detect(video ,gotResult);
        
         
            for(i = 0; i<object.length ;i++)
            {
                document.getElementById("stat").innerHTML = "Status: Object Detected";

                fill("#ff0000");
                percent = floor(object[i].confidence * 100);
                text(object[i].label+" "+percent+"%", object[i].x ,object[i].y);
                noFill();
                stroke("#ff0000");
                rect(object[i].x ,object[i].y ,object[i].width ,object[i].height);
                
                if(object[i].label == object_name)

                {
                    document.getElementById("number").innerHTML = object_name+" found";
                }
                else {
                    document.getElementById("number").innerHTML = object_name+" Not found";
                }
            }
        
    } 
}
