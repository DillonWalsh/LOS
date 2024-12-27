/* 
 * This file is part of the Law of Sines Explainer
 * Copyright (c) 2021 Dillon Walsh
 * 
 * A program to help display the Law of Sines.
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
    var pi = Math.PI;
    var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-3, 3, 3, -3]});


    var point_a = brd.create('point',[-2,1.5])
    var point_b = brd.create('point',[-2,-1.5])
    var point_c = brd.create('point',[2,-1.5])
    var line_a
    var line_b
    var line_c
    var angle_a
    var angle_b
    var angle_c

//draws the default triangle using 3 points and 3 lines.
    function maketriangle(){
        line_c = brd.create('segment',[point_a,point_b],{withLabel:true,
                                            name: function(){
                                                return 'c = ' + point_a.Dist(point_b).toFixed(2)
                                            },
                                            label: {position: 'ulf'}})
        line_a = brd.create('segment',[point_b,point_c],{withLabel:true,
                                            name: function(){
                                                return 'a = ' + point_b.Dist(point_c).toFixed(2)
                                            },
                                            label: {position: 'ulf'}})
        line_b = brd.create('segment',[point_c,point_a],{withLabel:true,
                                            name: function(){
                                                return 'b = ' + point_c.Dist(point_a).toFixed(2)
                                            },
                                            label: {position: 'ulf'}})

        angle_a = brd.create('nonreflexangle',[point_c,point_a,point_b],{radius: .3,
                                            name: function() {
                                                return radtodeg(JXG.Math.Geometry.angle(point_c, point_a, point_b)).toFixed(2) + '°'  
                                            }})
        angle_b = brd.create('nonreflexangle',[point_a,point_b,point_c],{radius: .3,
                                            name: function() {
                                                return radtodeg(JXG.Math.Geometry.angle(point_a, point_b, point_c)).toFixed(2) + '°'
                                            }})
        angle_c = brd.create('nonreflexangle',[point_b,point_c,point_a],{radius: .3,
                                            name: function() {
                                                return radtodeg(JXG.Math.Geometry.angle(point_b, point_c, point_a)).toFixed(2) + '°'
                                            }})
                                        }
    maketriangle();
    var what_aa = brd.create('text',[-2.5,2.5,function(){return "Angle A = " +  radtodeg(angle_a.Value()).toFixed(2) +'°'}])
    var what_ab = brd.create('text',[-2.5,2.25,function(){return "Angle B = " +  radtodeg(angle_b.Value()).toFixed(2) +'°'}])
    var what_ac = brd.create('text',[-2.5,2,function(){return "Angle C = " +  radtodeg(angle_c.Value()).toFixed(2) +'°'}])
    var what_la = brd.create('text',[-1,2.5,function(){return "Line a = " + line_a.L().toFixed(2)}])
    var what_lb = brd.create('text',[-1,2.25,function(){return "Line b = " + line_b.L().toFixed(2)}])
    var what_lc = brd.create('text',[-1,2,function(){return "Line c = " + line_c.L().toFixed(2)}])
    var line_p = null
    var point_p
    var a_to_d = null
    var b_to_d = null
    var c_to_d = null
    var other_p
    var ba
    var bb
    var bc
    var bback



    var b1 = brd.create('text', [-2, -2, '<button onclick="drawp()"> Set triangle</button>']);

    //draws the parralel line used in proof from the largest angle.
    var drawp = function(){
        point_a.setAttribute({fixed:true});
        point_b.setAttribute({fixed:true});
        point_c.setAttribute({fixed:true});
        //runs if a is the biggest
        if ((angle_a.Value() > angle_b.Value()) & (angle_a.Value() > angle_c.Value())) {
            point_p = brd.create('perpendicularpoint', [line_a, point_a])
            line_p = brd.create('perpendicularsegment', [line_a,point_a]);
            line_a.setAttribute({visible:false});
            b_to_d = brd.create('segment', [point_b,point_p],{strokecolor:"red"});
            c_to_d = brd.create('segment', [point_c,point_p],{strokecolor:"green"});
            other_p = [point_b,point_c]
            brd.removeObject(b1);
            sinBdividedbyc = radtodeg(angle_b.Value())/line_c.L()
            document.getElementById('text').innerHTML = '`sin(B) = h/c,'
                                                        + ' and sin(C) = h/b`' 
            document.getElementById('text2').innerHTML = '`sin(B)*c = h = sin(C)*b`'
            document.getElementById('text3').innerHTML = '`sin(B)/b = sin(C)/c ,'
                                                        + 'sin('
                                                        + radtodeg(angle_b.Value()).toFixed(2) 
                                                        + ')/'
                                                        + line_b.L().toFixed(2)
                                                        + '='
                                                        + 'sin('
                                                        + radtodeg(angle_c.Value()).toFixed(2) 
                                                        + ')/'
                                                        + line_c.L().toFixed(2)
                                                        +', '
                                                        + Math.sin(angle_b.Value())/line_b.L().toFixed(4)
                                                        + '='
                                                        + Math.sin(angle_c.Value())/line_c.L().toFixed(4)
                                                        + '`'
            MathJax.typeset()
            bb = brd.create('text', [-1, -2, '<button onclick="showb()"> See angle B</button>']);
            bc = brd.create('text', [0, -2, '<button onclick="showc()"> See angle C</button>']);


            
        }
        //runs if b is the biggest
        else if ((angle_b.Value() > angle_a.Value()) & (angle_b.Value() > angle_c.Value())) {
            point_p = brd.create('perpendicularpoint', [line_b, point_b])
            line_p = brd.create('perpendicularsegment', [line_b,point_b]);
            line_b.setAttribute({visible:false});
            a_to_d = brd.create('segment', [point_a,point_p],{strokecolor:"red"});
            c_to_d = brd.create('segment', [point_c,point_p],{strokecolor:"green"});
            other_p = [point_a,point_c]
            brd.removeObject(b1);
            ba = brd.create('text', [-1, -2, '<button onclick="showa()"> See angle A</button>']);
            bc = brd.create('text', [0, -2, '<button onclick="showc()"> See angle C</button>']);
            document.getElementById('text').innerHTML = '`sin(A) = h/c,'
                                                        + ' and sin(C) = h/a`' 
            document.getElementById('text2').innerHTML = '`sin(A)*c = h = sin(C)*a`'
            document.getElementById('text3').innerHTML = '`sin(A)/a = sin(C)/c ,'
                                                        + 'sin('
                                                        + radtodeg(angle_a.Value()).toFixed(2) 
                                                        + ')/'
                                                        + line_a.L().toFixed(2)
                                                        + '='
                                                        + 'sin('
                                                        + radtodeg(angle_c.Value()).toFixed(2) 
                                                        + ')/'
                                                        + line_c.L().toFixed(2)
                                                        +', '
                                                        + Math.sin(angle_a.Value())/line_a.L().toFixed(4)
                                                        + '='
                                                        + Math.sin(angle_c.Value())/line_c.L().toFixed(4)
                                                        + '`'
            MathJax.typeset()
            
        }
        else {
            //runs if c is the biggest
            point_p = brd.create('perpendicularpoint', [line_c, point_c])
            line_p = brd.create('perpendicularsegment', [line_c,point_c]);
            line_c.setAttribute({visible:false});
            b_to_d = brd.create('segment', [point_b,point_p],{strokecolor:"red"});
            a_to_d = brd.create('segment', [point_a,point_p],{strokecolor:"green"});
            other_p = [point_a,point_b]
            brd.removeObject(b1);
            ba = brd.create('text', [-1, -2, '<button onclick="showa()"> See angle A</button>']);
            bc = brd.create('text', [0, -2, '<button onclick="showb()"> See angle B</button>']);
                    document.getElementById('text').innerHTML = '`sin(A) = h/b,'
                                                        + ' and sin(B) = h/a`' 
            document.getElementById('text2').innerHTML = '`sin(A)*b = h = sin(B)*a`'
            document.getElementById('text3').innerHTML = '`sin(A)/a = sin(B)/b ,'
                                                        + 'sin('
                                                        + radtodeg(angle_a.Value()).toFixed(2) 
                                                        + ')/'
                                                        + line_a.L().toFixed(2)
                                                        + '='
                                                        + 'sin('
                                                        + radtodeg(angle_b.Value()).toFixed(2) 
                                                        + ')/'
                                                        + line_b.L().toFixed(2)
                                                        +', '
                                                        + Math.sin(angle_a.Value())/line_a.L().toFixed(4)
                                                        + '='
                                                        + Math.sin(angle_b.Value())/line_b.L().toFixed(4)
                                                        + '`'
            MathJax.typeset()
        }
    }
    //shows the right triangle with angle A 
    function showa()
    {
        brd.removeObject(ba);
        brd.removeObject(bb);
        brd.removeObject(bc);   
        line_a.setAttribute({dash:1})
        line_a.setAttribute({strokecolor:"grey"})
        if (b_to_d != null){
            b_to_d.setAttribute({dash:1});
            b_to_d.setAttribute({strokecolor:"grey"})
        }
        if (c_to_d != null){
            c_to_d.setAttribute({dash:1});
            c_to_d.setAttribute({strokecolor:"grey"})
        }
        bback = brd.create('text',[1,-2, '<button onclick="reset()"> Go back</button>']);   



    }
    //shows the right triangle with angle B
    function showb()
    {
        brd.removeObject(ba);
        brd.removeObject(bb);
        brd.removeObject(bc);
        line_b.setAttribute({dash:1})
        line_b.setAttribute({strokecolor:"grey"})
        if (a_to_d != null){
            a_to_d.setAttribute({dash:1});
            a_to_d.setAttribute({strokecolor:"grey"})
        }
        if (c_to_d != null){
            c_to_d.setAttribute({dash:1});
            c_to_d.setAttribute({strokecolor:"grey"})
        }
        bback = brd.create('text',[1,-2, '<button onclick="reset()"> Go back</button>']); 


    }
    //shows the right triangle with angle C
    function showc()
    {
        brd.removeObject(ba);
        brd.removeObject(bb);
        brd.removeObject(bc);   
        line_c.setAttribute({dash:1})
        line_c.setAttribute({strokecolor:"grey"})
        if (a_to_d != null){
            a_to_d.setAttribute({dash:1});
            a_to_d.setAttribute({strokecolor:"grey"})
        }
        if (b_to_d != null){
            b_to_d.setAttribute({dash:1});
            b_to_d.setAttribute({strokecolor:"grey"})
        }
        bback = brd.create('text',[1,-2, '<button onclick="reset()"> Go back</button>']);       


    }
    //resets to after drap()
    function reset()
    {
        brd.removeObject(line_a);
        brd.removeObject(line_b);
        brd.removeObject(line_c);
        brd.removeObject(angle_a);
        brd.removeObject(angle_b);
        brd.removeObject(angle_c);
        maketriangle();
        brd.removeObject(bback);
        b1 = brd.create('text', [-2, -2, '<button onclick="drawp()"> Set triangle</button>']);
        drawp();

        

    }
    point_a.on("drag", function() {
        onDrag()
        })

    point_b.on("drag", function() {
        onDrag()
        })

    point_c.on("drag", function() {
        onDrag()
        })

    line_a.on("drag", function() {
        onDrag()
        })

    line_b.on("drag", function() {
        onDrag()
        })

    line_c.on("drag", function() {
        onDrag()
        })
        
    var onDrag = function()
    {
        ratio_of_a = Math.sin(angle_a.Value())/line_a.L()
        document.getElementById('text').innerHTML = '`sin(A)/a   = sin(' 
                                                    + radtodeg(angle_a.Value()).toFixed(2) 
                                                    + '°)/' 
                                                    + line_a.L().toFixed(2) 
                                                    + '=' 
                                                    + ratio_of_a.toFixed(4)
                                                    +'`'

        ratio_of_b = Math.sin(angle_b.Value())/line_b.L()
        document.getElementById('text2').innerHTML = '`sin(B)/b   = sin(' 
                                                    + radtodeg(angle_b.Value()).toFixed(2) 
                                                    + '°)/' 
                                                    + line_b.L().toFixed(2) 
                                                    + '=' 
                                                    + ratio_of_b.toFixed(4)
                                                    +'`'
        ratio_of_c = Math.sin(angle_c.Value())/line_c.L()
        document.getElementById('text3').innerHTML = '`sin(C)/c   = sin(' 
                                                    + radtodeg(angle_c.Value()).toFixed(2) 
                                                    + '°)/' 
                                                    + line_c.L().toFixed(2) 
                                                    + '=' 
                                                    + ratio_of_c.toFixed(4)
                                                    +'`'
        MathJax.typeset()
    }


    //radians to degrees    
    function radtodeg(n){
        return Math.abs(n * (180/pi))
    }