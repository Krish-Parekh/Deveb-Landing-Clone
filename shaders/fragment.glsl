varying vec2 vUv;
varying float vElevation;
uniform float uColorChange;

void main() {
    // Pink/Red colors
    vec4 c1 = vec4(1.0, 0.8, 0.9, 1.0); 
    vec4 c2 = vec4(1.0, 0.9, 0.95, 1.0);

    // Blue colors
    vec4 c3 = vec4(0.8, 0.9, 1.0, 1.0);
    vec4 c4 = vec4(0.9, 0.95, 1.0, 1.0);

    // Green colors
    vec4 c5 = vec4(0.8, 1.0, 0.9, 1.0);
    vec4 c6 = vec4(0.9, 1.0, 0.95, 1.0);

    // Purple colors
    vec4 c7 = vec4(0.9, 0.8, 1.0, 1.0);
    vec4 c8 = vec4(0.95, 0.9, 1.0, 1.0);

    // Orange colors
    vec4 c9 = vec4(1.0, 0.9, 0.8, 1.0);
    vec4 c10 = vec4(1.0, 0.95, 0.9, 1.0);

    float v = smoothstep(-0.14, .14, vElevation);
    
    // Create color pairs
    vec4 colorPink = mix(c1, c2, v);
    vec4 colorBlue = mix(c3, c4, v);
    vec4 colorGreen = mix(c5, c6, v);
    vec4 colorPurple = mix(c7, c8, v);
    vec4 colorOrange = mix(c9, c10, v);

    // Use uColorChange to transition between multiple colors
    vec4 final;
    if (uColorChange < 0.25) {
        final = mix(colorPink, colorBlue, uColorChange * 4.0);
    } else if (uColorChange < 0.5) {
        final = mix(colorBlue, colorGreen, (uColorChange - 0.25) * 4.0);
    } else if (uColorChange < 0.75) {
        final = mix(colorGreen, colorPurple, (uColorChange - 0.5) * 4.0);
    } else {
        final = mix(colorPurple, colorOrange, (uColorChange - 0.75) * 4.0);
    }
    
    gl_FragColor = final;
}
