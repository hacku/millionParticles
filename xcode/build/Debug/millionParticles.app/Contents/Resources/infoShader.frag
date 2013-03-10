uniform sampler2D posTex;
uniform sampler2D infoTex;

void main()
{
	
	vec4 info = texture2D(infoTex,gl_TexCoord[0].xy);
	
	

	gl_FragColor = gl_Color;
}
