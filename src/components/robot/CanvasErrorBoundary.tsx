import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onError: (error: Error) => void;
  fallback: ReactNode;
};

type State = { hasError: boolean };

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
