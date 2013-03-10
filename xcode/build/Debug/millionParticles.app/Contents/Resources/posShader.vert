uniform sampler2D posTex;
uniform sampler2D infTex;

uniform float scale;

void main()
{
	vec4 newVertexPos;
	vec4 dv;

	dv = texture2D( posTex, gl_MultiTexCoord0.st );
	float age = texture2D(infTex, gl_MultiTexCoord0.st).r;
	float life = texture2D(infTex, gl_MultiTexCoord0.st).g;
	
	newVertexPos = vec4(scale * dv.x, scale * dv.y, scale * dv.z, 1);
	
	gl_PointSize = 1.0 * (1.0 - age / life);
	gl_PointSize = clamp(gl_PointSize, 0.01, 5.0); 

	gl_Position = gl_ModelViewProjectionMatrix * newVertexPos;
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_FrontColor  = gl_Color;
}

