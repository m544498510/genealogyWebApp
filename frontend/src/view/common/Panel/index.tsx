import * as React from 'react';

export interface PanelProps {
  title?: string,
  className?: string,
  children: React.ReactNode,
}
export default function Panel({ title, className = '', children }: PanelProps) {
  let panelTitle: React.ReactNode;
  if (title) {
    panelTitle = (
      <div className="panel-heading">
        <h4 className="panel-title">{title}</h4>
      </div>
    );
  }
  return (
    <div className={`panel ${className}`} >
      {panelTitle}
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}
