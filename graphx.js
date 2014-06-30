   paper.install(window);
var tool;var add = false;
var ex;var graph;var pagex,pagey; var group;var ci = 0;var backg;var zcount =1;var axis,trans,cax,t,formslided; formslided = false;
window.onload = function(){
	setcss();
paper.setup(canvas);
backg = new Group();
axis = new Group();
trans = new Point(0,0);

var c= view.center;
	 var x = c.x;
	 var y = c.y;

pagex = new Path();
pagex.add([c.x+5000,c.y]);
pagex.add([c.x-5000,c.y]);
pagey = new Path();
pagey.add([c.x,c.y+5000]);
pagey.add([c.x,c.y-5000]);
pagex.strokeColor = 'gray';
pagey.strokeColor = 'gray';
var linex = new Symbol(pagex);
var liney = new Symbol(pagey);
for(var i=-5000; i<=5000;i=i+50)
{var cx,cy;
	cx = x+i;
	cy = y+i;
	var cenx = linex.place([x,cy]);
	var ceny = liney.place([cx,y]);
	backg.addChild(cenx);
	backg.addChild(ceny);
}
cenx = new Path();
cenx.add([x+5000,y]);
cenx.add([x-5000,y]);
cenx.strokeColor = 'black';
cenx.strokeWidth = 1;
ceny = new Path();
ceny.add([x,y+5000]);
ceny.add([x,y-5000]);
ceny.strokeColor = 'black';
ceny.strokeWidth = 1;
axis.addChild(cenx);
axis.addChild(ceny);
group = new Layer();


		tool = new Tool();
		tool.onMouseDrag = function(event){
			if(graph)
			{
			if(event.modifiers.shift)
			{
			var angle = event.delta.angle;
			
				if((angle>-90&&angle<90))
				{
			group.scale(1.1, c);
						axis.scale(1.1, c);

			group.previousSibling.scale(1.1, c);
			zcount*=1.1;
				}
			
			else
			{
			group.scale(1/1.1, c);
			axis.scale(1/1.1, c);
				group.previousSibling.scale(1/1.1, c);
				zcount/=1.1;
			}
			}
			else
			{
			group.translate(event.delta);
			group.previousSibling.translate(event.delta);
			axis.translate(event.delta);
			//trans.x+= event.delta.x*zcount;
			//trans.y+= event.delta.y*zcount;
			}
		}
		}
		tool.onKeyDown = function(event){
			if(event.key=='u')
			{
				group.lastChild.opacity = 0;
			}
			else if(event.key=='r')
			{
				group.lastChild.opacity = 1;
			}
		}
view.draw();
}
function draw(){
	$('#exp').blur();
	slideForm();
	var ca = ["blue","red","green","yellow","orange"];
		
	if(!add)
	{
		ci =0;
	group.removeChildren();
	}	
	 var c= view.center; cax  = axis.position; 
	 var x = c.x;	 var y = c.y;
   ex = document.forms[0][0].value;
graph = new Path();
for(var i=-5000; i<=5000;i++)
{var cx,cy;
	cx = x+i;
	var yy = (50*f(i/50,ex));
	if (isNaN(yy) || (yy == Number.NEGATIVE_INFINITY) ||
					(yy == Number.POSITIVE_INFINITY) || (Math.abs(yy) > 2e5))
	continue;
	cy = y+yy;
	graph.add([cx,cy]);
	
}
graph.smooth();
graph.strokeColor = ca[ci++%5];
graph.strokeWidth = 2;
graph.scale(zcount, c);
t = new Point((graph.position.x-c.x),(graph.position.y-c.y));
graph.position.x= cax.x+t.x;
graph.position.y= cax.y+t.y;


group.moveAbove(backg);
view.draw();
}


function f(x,expr)
{var res = 0; var extemp = expr;var ind;var r;var cou=0;var start,end;var compute,subexp,subres;compute = false;


extemp.toLowerCase();
while(extemp.indexOf('pi')!=-1)
extemp = extemp.replace('pi',Math.PI);
while(extemp.indexOf('e')!=-1)
extemp = extemp.replace('e',Math.E);
var l = extemp.length;
//alert(extemp);
for( var i=0;i<l;i++)
{
	var ch = extemp.charAt(i);
	if(ch=='(')
	{
		cou++;
		if(cou==1)
		start = i+1;
	}
	else if(ch==')')
	{
		cou--;
		if(cou==0)
		{
			compute = true;
		end = i;
	}
	if(compute)
	{
		compute = false;
		subexp = extemp.substring(start,end);
		
		
		subres = Number(f(x,subexp))*-1;
		var r = '('+subexp+')';
		extemp = extemp.replace(r,String(subres));
		//alert('a'+extemp);
	}
	
}
}
	while(extemp.indexOf('sin')!=-1)
	{ ind = extemp.indexOf('sin')+3;
		var nxt = getNext(extemp,ind);
		//alert(nxt);
				r= 'sin'+nxt;
		if(nxt=='x')
		var sx = String(Math.sin(x));
		else
		{
		nxt = Number(nxt);
		var sx = String(Math.sin(nxt));
		}
		extemp = extemp.replace(r,sx);	}
		
	while(extemp.indexOf('cos')!=-1)
	{ ind = extemp.indexOf('cos')+3;
		var nxt = getNext(extemp,ind);
				r= 'cos'+nxt;
		if(nxt=='x')
		var sx = String(Math.cos(x));
		else
		{
		nxt = Number(nxt);
		var sx = String(Math.cos(nxt));
		}
		extemp = extemp.replace(r,sx);	}
	while(extemp.indexOf('tan')!=-1)
	{ ind = extemp.indexOf('tan')+3;
		var nxt = getNext(extemp,ind);
				r= 'tan'+nxt;
		if(nxt=='x')
		var sx = String(Math.tan(x));
		else
		{
		nxt = Number(nxt);
		var sx = String(Math.tan(nxt));
		}
		extemp = extemp.replace(r,sx);	}
		while(extemp.indexOf('log')!=-1)
	{ ind = extemp.indexOf('log')+3;
		var nxt = getNext(extemp,ind);
				r= 'log'+nxt;
		if(nxt=='x')
		var sx = String(Math.log(x));
		else
		{
		nxt = Number(nxt);
		var sx = String(Math.log(nxt));
		}
		extemp = extemp.replace(r,sx);	}
		
		while(extemp.indexOf('exp')!=-1)
	{ ind = extemp.indexOf('exp')+3;
		var nxt = getNext(extemp,ind);
				r= 'exp'+nxt;
		if(nxt=='x')
		var sx = String(Math.exp(x));
		else
		{
		nxt = Number(nxt);
		var sx = String(Math.exp(nxt));
		}
		extemp = extemp.replace(r,sx);	}
		
		while(extemp.indexOf('sqrt')!=-1)
	{ ind = extemp.indexOf('sqrt')+4;
		var nxt = getNext(extemp,ind);
				r= 'sqrt'+nxt;
		if(nxt=='x')
		var sx = String(Math.sqrt(x));
		else
		{
		nxt = Number(nxt);
		var sx = String(Math.sqrt(nxt));
		}
		extemp = extemp.replace(r,sx);	}
		
		while(extemp.indexOf('abs')!=-1)
	{ ind = extemp.indexOf('abs')+3;
		var nxt = getNext(extemp,ind);
				r= 'abs'+nxt;
		if(nxt=='x')
		var sx = String(Math.abs(x));
		else
		{
		nxt = Number(nxt);
		var sx = String(Math.abs(nxt));
		}
		extemp = extemp.replace(r,sx);	}
		
		
	while(extemp.indexOf('^')!=-1)
	{
		var i = extemp.indexOf('^');
		var b = getPrev(extemp,(i-1));
		var e = getNext(extemp,(i+1));
		
		var sr = String(b+'^'+e);
				if(b=='x')
		b=Number(x);
		else
		b = Number(b);
if(e=='x')
e = Number(x);
 else
 e = Number(e);
		var r = String(Math.pow(b,e));
	extemp = extemp.replace(sr,r);
		
	}
	while(extemp.indexOf('--')!=-1)
	{
		var i = extemp.indexOf('--');
		var b = getPrev(extemp,(i-1));

		if(b=='')
	extemp = extemp.replace('--','');
	else
	extemp = extemp.replace('--','+');
	}
	//alert('final  '+extemp);
	res = Number(-1*eval(extemp));
	//alert(res);
	return (res);
}

function getNext(expr,ind)
{var cont = true; var res = "";var chk = ind;
	do
	{
		var c = expr.charAt(ind++);
		if(c=='x')
		{
			res= 'x';
			break;
		}
		else if(!isNaN(c)||c=='.'||((ind-1==chk)&&c=='-'))
			res=res+c;
			else
			cont=false;
	}
	while(cont&&ind<expr.length);
				return res;
}
function getPrev(expr,ind)
{var cont = true; var res = "";var chk = ind;
	do
	{
		var c = expr.charAt(ind--);
		if(c=='x')
		{
			res= 'x';
			break;
		}
		else if(!isNaN(c)||c=='.')
			res=c+res;
			else
			{
			if(c=='-')
			res=c+res;
			cont=false;
			}
	}
	while(cont&&ind>-1);
				return res;
}
  
  
   function setcss()
   {
	   $('#form').css('height',(screen.availHeight*0.9)+'px');
	   $('#form').css('top',(screen.availHeight*0.05)+'px');
   }
   function slideForm()
   {
	   if(!formslided)
	   {
	   $('#form').css('top',screen.availHeight*-0.80+'px');
	   $('#pull').css('display','inherit');
	   formslided = true;  
	   }
	   else
	   {
		     $('#pull').css('display','none');
	    $('#form').css('top','-1%');
	   }
   }
   function resetForm()
   {
	    $('#form').css('top',screen.availHeight*-0.80+'px');
		   $('#pull').css('display','inherit');
   }
 