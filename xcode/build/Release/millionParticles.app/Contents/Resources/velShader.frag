#extension GL_EXT_gpu_shader4: enable

uniform sampler2D positions;
uniform sampler2D velocities;
uniform sampler2D information;
uniform sampler2D oVelocities;
//uniform sampler2D oPositions;
uniform sampler2D vectorField;

uniform float pX;
uniform float pY;

uniform bool createParticles;

varying vec4 texCoord;

float tStep = .005;

void main()
{

	vec3 pos = texture2D( positions, texCoord.st).rgb;
	float mass = texture2D( positions, texCoord.st).a;

	vec3 vel = texture2D( velocities, texCoord.st).rgb;
	float decay = texture2D( velocities, texCoord.st).a;

	vec3 origVel = texture2D(oVelocities, texCoord.st).rgb;
	//vec3 origPos = texture2D(oPositions, texCoord.st).rgb;

	vec3 vector = texture2D(vectorField, pos.xy).rgb;

	float age = texture2D( information, texCoord.st).r;
	float maxAge = texture2D( information, texCoord.st).g;

	float newAge = age + tStep;
	vec3 newPos = pos + vel;
	vec3 newVel = decay * vector + decay * vel;
	
	newPos.z = pos.z;

	if(createParticles)
	{
		if( newAge >= maxAge)
		{
			newAge = 0.00;
			newPos = vec3(pX,pY,0.0);//origPos + 
			newVel = vec3(origVel / 10.0);
		}
	}

	gl_FragData[0] = vec4(newPos, mass);
	gl_FragData[1] = vec4(newVel, decay);
	gl_FragData[2] = vec4(newAge, maxAge, 0.0, 1.0);
}
