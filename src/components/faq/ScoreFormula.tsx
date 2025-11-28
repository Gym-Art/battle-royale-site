export const ScoreFormula: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-surface-muted/30 border border-surface-muted rounded">
      <p className="text-neon-green font-display text-sm tracking-wider mb-3">THE FORMULA</p>
      <div className="bg-surface-dark p-4 rounded border border-surface-muted text-center mb-4">
        <p className="text-text-primary font-mono text-lg">
          <span className="text-neon-pink">Normalized Score</span> = (<span className="text-neon-green">FIG Score</span> ÷{' '}
          <span className="text-neon-yellow">Max Start Value</span>) × 10
        </p>
      </div>
      <p className="text-neon-pink font-display text-sm tracking-wider mb-2">EXAMPLE</p>
      <div className="bg-surface-dark p-4 rounded border border-surface-muted">
        <p className="text-text-secondary mb-2">
          A gymnast scores <span className="text-neon-green font-semibold">14.2</span> on Men&apos;s Vault (piked
          Dragulescu):
        </p>
        <p className="text-text-primary font-mono text-center my-3">
          14.2 ÷ 15.6 × 10 = <span className="text-neon-green font-bold">9.10256</span>
        </p>
        <p className="text-text-secondary text-sm">
          Note: In men&apos;s gymnastics, the highest possible start value on Vault is 15.6 (ex. a piked Dragulescu).
        </p>
      </div>
    </div>
  );
};

