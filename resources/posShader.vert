uniform sampler2D posTex;
uniform sampler2D infTex;

uniform float scale;
varying float age;

void main()
{
	vec4 newVertexPos;
	vec4 dv;

	dv = texture2D( posTex, gl_MultiTexCoord0.st );
	
    age = texture2D(infTex, gl_MultiTexCoord0.st).r;
	
    //scale vertex position to screen size
	newVertexPos = vec4(scale * dv.x, scale * dv.y, scale * dv.z, 1);
	
    //adjust point size
	gl_PointSize = 1.0 - age;

	gl_Position = gl_ModelViewProjectionMatrix * newVertexPos;
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_FrontColor  = gl_Color;
}

