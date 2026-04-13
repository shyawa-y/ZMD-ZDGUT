import numpy as np
import plotly.graph_objects as go

# ====================== INTERACTIVE 3-DIPOLE / 2-TORUS + CONE ======================
def create_interactive_geometry():
    turns_init = 12.0
    amp_init = 3.0
    points = 1200

    def generate_spiral(turns, amp):
        t = np.linspace(0, turns * 2 * np.pi, points)
        radius = amp * (1 - t / (turns * 2 * np.pi))          # tapering cone
        x = radius * np.cos(t)
        y = radius * np.sin(t)
        z = 0.85 * (t / (turns * np.pi)) - 3.5                # moves toward center
        return x, y, z

    x_s, y_s, z_s = generate_spiral(turns_init, amp_init)

    # Torus 1 (blue)
    theta = np.linspace(0, 2*np.pi, 70)
    phi = np.linspace(0, 2*np.pi, 70)
    TH, PH = np.meshgrid(theta, phi)
    R, r = 2.6, 0.52
    x_t1 = (R + r * np.cos(PH)) * np.cos(TH)
    y_t1 = (R + r * np.cos(PH)) * np.sin(TH)
    z_t1 = r * np.sin(PH)

    # Torus 2 (red) — perpendicular, sharing the exact same zero
    x_t2 = r * np.sin(PH)
    y_t2 = (R + r * np.cos(PH)) * np.cos(TH)
    z_t2 = (R + r * np.cos(PH)) * np.sin(TH)

    fig = go.Figure()

    # Toruses (orthogonal anchors)
    fig.add_trace(go.Surface(x=x_t1, y=y_t1, z=z_t1,
                             colorscale='Blues', opacity=0.35, showscale=False,
                             name='Torus 1 (orthogonal zero anchor)'))
    fig.add_trace(go.Surface(x=x_t2, y=y_t2, z=z_t2,
                             colorscale='Reds', opacity=0.35, showscale=False,
                             name='Torus 2 (orthogonal zero anchor)'))

    # Conical spiral (variable amplitude)
    fig.add_trace(go.Scatter3d(x=x_s, y=y_s, z=z_s,
                               mode='lines',
                               line=dict(color='lime', width=9),
                               name='Conical Spiral (amplitude = nesting depth)'))

    # Shared logical zero (the fixed fulcrum)
    fig.add_trace(go.Scatter3d(x=[0], y=[0], z=[0],
                               mode='markers',
                               marker=dict(size=16, color='gold', symbol='diamond'),
                               name='Shared Logical Zero (X=0) — invariant across all scales'))

    fig.update_layout(
        title="2 Toruses + Variable Conical Spiral<br>"
              "Shared zero anchor • Orthogonal references • Scalar straightening near center<br>"
              "Slide 'Turns' and 'Amplitude' to explore nesting & scale invariance",
        scene=dict(
            xaxis=dict(title='X', range=[-5.5, 5.5]),
            yaxis=dict(title='Y', range=[-5.5, 5.5]),
            zaxis=dict(title='Z', range=[-5.5, 5.5]),
            aspectmode='cube',
            camera=dict(eye=dict(x=1.9, y=1.9, z=1.4))
        ),
        width=980,
        height=740,
        margin=dict(l=0, r=0, b=90, t=90)
    )

    # Live sliders
    fig.update_layout(
        sliders=[
            dict(
                active=0,
                currentvalue={"prefix": "Turns (nesting depth): "},
                pad={"t": 60},
                steps=[dict(method='restyle',
                            args=[{'x': [generate_spiral(v, amp_init)[0],
                                         generate_spiral(v, amp_init)[1],
                                         generate_spiral(v, amp_init)[2]]}],
                            label=str(round(v,1)))
                       for v in np.linspace(4, 35, 32)]
            ),
            dict(
                active=0,
                currentvalue={"prefix": "Amplitude (extra coils & depth): "},
                pad={"t": 100},
                steps=[dict(method='restyle',
                            args=[{'x': [generate_spiral(turns_init, v)[0],
                                         generate_spiral(turns_init, v)[1],
                                         generate_spiral(turns_init, v)[2]]}],
                            label=str(round(v,1)))
                       for v in np.linspace(1.5, 7.0, 36)]
            )
        ]
    )

    fig.show()

create_interactive_geometry()
