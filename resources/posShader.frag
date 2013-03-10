#version 120 

uniform sampler2D posTex;
uniform sampler2D velTex;
uniform sampler2D infTex;

uniform sampler2D spriteTex;

varying float age;

void main()
{
	vec4 colFac = vec4(1.0);//texture2D(spriteTex, gl_PointCoord);
    colFac.rgb *= texture2D( posTex, gl_TexCoord[0].st ).rgb;

//    colFac.a *= .35;
	colFac.a *= age;
    
	gl_FragColor = colFac;
}
