//#extension GL_ARB_draw_buffers : enable

uniform sampler2D positions;
uniform sampler2D velocities;
uniform sampler2D information;

varying vec4 texCoord;

void main()
{
	gl_TexCoord[0] = gl_MultiTexCoord0;
	texCoord = gl_MultiTexCoord0;
	gl_Position    = gl_ModelViewProjectionMatrix * gl_Vertex;
	gl_FrontColor  = gl_Color;
}

