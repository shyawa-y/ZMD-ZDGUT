"""
3D Spherical Wave Smearing Model: Transverse Doppler Effect
Computes the photon wavefunction for a cesium atom's hyperfine transition,
deriving the frequency shift to validate time dilation as a spatial effect.
Author: [Your Name]
License: [Choose a license, e.g., MIT]
"""

import numpy as np
from scipy.integrate import dblquad

# Constants
f_0 = 9.19263177e9  # Hz, cesium clock frequency
c = 2.99792458e8    # m/s, speed of light
hbar = 1.054571817e-34  # J·s, reduced Planck constant
m = 2.20694657e-25  # kg, cesium-133 mass
sigma = 1e-6        # m, wave packet width
v = 0.1 * c         # m/s, atom velocity
d = 1.0             # m, nominal observer distance (non-local in QM context)
gamma = 1 / np.sqrt(1 - (v/c)**2)  # Lorentz factor
T_0 = 1 / f_0       # s, oscillation period

# Integrand function for photon wavefunction
def integrand(t_0, x_0, t_prime):
    """
    Computes the integrand for the photon wavefunction.
    Args:
        t_0 (float): Emission time (s).
        x_0 (float): Emission x-position (m).
        t_prime (float): Observer time (s).
    Returns:
        complex: Integrand value.
    """
    try:
        # Gaussian wave packet
        gaussian = np.exp(-(x_0 - v * t_0)**2 / sigma**2)
        # Atom's phase
        atom_phase = np.exp(1j * (gamma * m * v * x_0 - gamma * m * c**2 * t_0) / hbar)
        # Photon's phase
        photon_phase = np.exp(1j * 2 * np.pi * f_0 * (t_prime - t_0 - np.sqrt(x_0**2 + d**2) / c))
        return gaussian * atom_phase * photon_phase
    except OverflowError:
        return 0  # Handle numerical overflow

# Compute wavefunction at multiple t_prime values
t_prime_base = 1e-9  # s, base time for evaluation
t_prime_values = [t_prime_base, t_prime_base + T_0]  # Points for phase derivative
psi_values = []

for t_prime in t_prime_values:
    # Integration limits (centered around t' - d/c)
    t_0_center = t_prime - d / c
    t_0_min = t_0_center - 5 * T_0  # Narrower limits for stability
    t_0_max = t_0_center + 5 * T_0
    x_0_min = -2 * sigma  # Adjusted for convergence
    x_0_max = 2 * sigma

    # Real and imaginary parts
    real_part, real_err = dblquad(lambda t_0, x_0: np.real(integrand(t_0, x_0, t_prime)),
                                  x_0_min, x_0_max, t_0_min, t_0_max, epsabs=1e-8, epsrel=1e-8)
    imag_part, imag_err = dblquad(lambda t_0, x_0: np.imag(integrand(t_0, x_0, t_prime)),
                                  x_0_min, x_0_max, t_0_min, t_0_max, epsabs=1e-8, epsrel=1e-8)
    psi = real_part + 1j * imag_part
    psi_values.append((psi, real_err, imag_err))

# Compute phase and frequency
psi_1, psi_2 = psi_values[0][0], psi_values[1][0]
phase_1 = np.angle(psi_1)
phase_2 = np.angle(psi_2)
delta_t = T_0
frequency = (phase_2 - phase_1) / (2 * np.pi * delta_t)

# Expected values
expected_f = f_0 * np.sqrt(1 - (v/c)**2)
expected_kappa = 1 / np.sqrt(1 - (v/c)**2)

# Output results
print(f"Computed frequency: {frequency:.2e} Hz")
print(f"Expected frequency: {expected_f:.2e} Hz")
print(f"Computed kappa(v): {f_0 / frequency:.6f}")
print(f"Expected kappa(v): {expected_kappa:.6f}")
print(f"Integration errors (t_prime = {t_prime_base:.2e} s): Real = {psi_values[0][1]:.2e}, Imag = {psi_values[0][2]:.2e}")
print(f"Integration errors (t_prime = {t_prime_base + T_0:.2e} s): Real = {psi_values[1][1]:.2e}, Imag = {psi_values[1][2]:.2e}")
