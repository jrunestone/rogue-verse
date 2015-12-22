precision mediump float;

varying vec4 vColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uLightmap;

uniform vec4 ambientColor;
uniform vec2 resolution;

void main() {
    vec2 lightCoord = gl_FragCoord.xy / resolution.xy;
    vec4 lightColor = texture2D(uLightmap, lightCoord);
    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);

    vec3 ambient = ambientColor.rgb * ambientColor.a;
    vec3 intensity = ambient + lightColor.rgb;
    vec4 finalColor = vec4(diffuseColor.rgb * intensity, diffuseColor.a);

    gl_FragColor = finalColor;
}