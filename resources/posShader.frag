uniform sampler2D posTex;
uniform sampler2D velTex;
uniform sampler2D infTex;

varying float age;

void main()
{
	vec4 colFac = texture2D(posTex, gl_TexCoord[0].st);
    //vec4 colFac = vec4(1.0);
	colFac = normalize(colFac);
	vec4 color = gl_Color * colFac;

	color.a = age;
    
	gl_FragColor = color;
}
