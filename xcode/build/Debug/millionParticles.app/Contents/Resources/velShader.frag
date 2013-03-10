#extension GL_EXT_gpu_shader4: enable

uniform sampler2D positions;
uniform sampler2D velocities;
uniform sampler2D information;
uniform sampler2D oVelocities;
uniform sampler2D oPositions;
uniform sampler2D vectorField;

uniform float pX;
uniform float pY;

uniform bool createParticles;

uniform float time;

varying vec4 texCoord;

float TWOPI = 6.2832;
float tStep = .005;

float rand(vec2 n)
{
  return 0.5 + 0.5 *
     fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);
}

void main()
{

	vec3 pos = texture2D( positions, texCoord.st).rgb;
	float mass = texture2D( positions, texCoord.st).a;

	vec3 vel = texture2D( velocities, texCoord.st).rgb;
	float decay = texture2D( velocities, texCoord.st).a;

	vec3 origVel = texture2D(oVelocities, texCoord.st).rgb;
	vec3 origPos = texture2D(oPositions, texCoord.st).rgb;

	vec3 vector = texture2D(vectorField, pos.xy).rgb;

	float age = texture2D( information, texCoord.st).r;
	float maxAge = texture2D( information, texCoord.st).g;

	float newAge = age + tStep;
	vec3 newPos = pos + vel;
	vec3 newVel = decay * vector + decay * vel;
	newPos.z = pos.z;
//	newPos.z = 0.0;
	//newPos = clamp(newPos, 0.0, 1.0);

	if(createParticles)
	{
		if( newAge >= maxAge)
		{
			newAge = 0.00;
			newPos = origPos;
			newVel = vec3(origVel / 10.0);
		}
	}
	//Render to positions texture
	gl_FragData[0] = vec4(newPos, mass);
	//Render to velocities texture
	gl_FragData[1] = vec4(newVel, decay);
	//Render to information texture
	gl_FragData[2] = vec4(newAge, maxAge, 0.0, 1.0);
}
