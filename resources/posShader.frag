uniform sampler2D posTex;
uniform sampler2D velTex;
uniform sampler2D infTex;

varying float age;

void main()
{
	vec4 colFac = texture2D(posTex, gl_TexCoord[0].st);

	colFac = normalize(colFac);
	vec4 color = gl_Color * colFac;

	color.a = age;

	/*
	color.r = 1.0;
	color.g = 1.0;
	color.b = 1.0;
    */
    
	gl_FragColor = color;
}
