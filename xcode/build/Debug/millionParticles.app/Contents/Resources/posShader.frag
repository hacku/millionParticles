uniform sampler2D posTex;
uniform sampler2D velTex;
uniform sampler2D infTex;

void main()
{
	vec4 colFac = texture2D(posTex, gl_TexCoord[0].st);

//	colFac = abs(colFac);
	colFac = normalize(colFac);
	vec4 color = gl_Color * colFac;

	float age = texture2D(infTex,gl_TexCoord[0].st).r;
	float lifeSpan = texture2D(infTex,gl_TexCoord[0].st).g;

	color.a = 3.0 - age;
	color.a = clamp(color.a, 0.0, 3.0);
	
	color.r = abs(color.r);
	color.g = abs(color.g);
	color.b = abs(age);

	gl_FragColor = color;
}
