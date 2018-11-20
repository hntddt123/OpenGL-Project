//Shaders

#version 330 core
out vec4 color;

in vec3 FragPos;  
in vec3 Normal;  
  
uniform vec3 lightPos; 
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

void main()
{
    // MARK: Ambient I = (Ka * Ia)
    float ambientStrength = 0.1f;
    vec3 ambientIntensity = lightColor * ambientStrength;
    
    // MARK: Diffuse I = Kd * Σ(N · L)
    vec3 lightVector = normalize(lightPos - FragPos);
    vec3 normalizedNormal = normalize(Normal);
    float diffuseScalar = max(dot(normalizedNormal, lightVector), 0.0);
    vec3 diffuseIntensity = diffuseScalar * lightColor;

    // MARK: Specular I = Ks * Σ(R · E)ˢ
    float specularStrength = 1.0f;
    vec3 lightReflection = reflect(-lightVector, normalizedNormal);
    vec3 eyeVector = normalize(viewPos - FragPos);
    float shininess = 16.0f;
    float specular = pow(max(dot(lightReflection, eyeVector), 0.0), shininess);

    vec3 specularIntensity = specularStrength * specular * lightColor;

    vec3 result = (ambientIntensity + diffuseIntensity + specularIntensity) * objectColor;
    color = vec4(result, 1.0f);
} 
