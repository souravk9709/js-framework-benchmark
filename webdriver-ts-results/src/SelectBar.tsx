import * as React from 'react';
import './App.css';
import {DropDown} from './DropDown'
import {DropDownContents} from './DropDownContents'
import {Framework, Benchmark, DropdownCallback} from './Common';
import {SelectBarFrameworks} from './SelectBarFrameworks';
import {SelectBarBenchmarks} from './SelectBarBenchmarks';

export interface Props {
  frameworkSelectKeyed: DropdownCallback<Framework>;
  frameworkSelectNonKeyed: DropdownCallback<Framework>;
  benchSelectCpu: DropdownCallback<Benchmark>;
  benchSelectStartup: DropdownCallback<Benchmark>;
  benchSelectMem: DropdownCallback<Benchmark>;
  selectFramework: (framework: Framework, value: boolean) => void;
  selectBenchmark: (benchmark: Benchmark, value: boolean) => void;
  selectSeparateKeyedAndNonKeyed: (value: boolean) => void;
  separateKeyedAndNonKeyed: boolean;
  frameworksKeyed: Array<Framework>;
  frameworksNonKeyed: Array<Framework>;
  benchmarksCPU: Array<Benchmark>;
  benchmarksStartup: Array<Benchmark>;
  benchmarksMEM: Array<Benchmark>;
  compareWith: Framework | undefined;
  selectComparison: (framework: string) => void;
  useMedian: boolean;
  selectMedian: (value: boolean) => void;
}

const SelectCategory = ({benchmarks, select, benchSelect, label} :
            {benchmarks: Array<Benchmark>, select: (benchmark: Benchmark, value: boolean) => void, benchSelect: DropdownCallback<Benchmark>, label: string} ) => {
        return (<DropDownContents {...benchSelect}>
            <h3>{label}</h3>
            <div>
            <SelectBarBenchmarks isSelected={benchSelect.isSelected} select={select} benchmarks={benchmarks} />
            </div>
        </DropDownContents>);
}



export class SelectBar extends React.Component<Props, {}> {
    render() {
    let   {frameworkSelectKeyed,
          frameworkSelectNonKeyed,
          benchSelectCpu,
          benchSelectStartup,
          benchSelectMem,
          selectFramework,
          selectBenchmark,
          selectSeparateKeyedAndNonKeyed,
          separateKeyedAndNonKeyed,
          frameworksKeyed,
          frameworksNonKeyed,
          benchmarksCPU,
          benchmarksStartup,
          benchmarksMEM,
          compareWith,
          selectComparison,
          useMedian,
          selectMedian
      } = this.props;
        return (
          <div>
            <div>
              <DropDown label="Which frameworks?" width='1024px'>
                <DropDownContents {...frameworkSelectKeyed}>
                  <h3>Keyed frameworks:</h3>
                  <div>
                    <SelectBarFrameworks isSelected={frameworkSelectKeyed.isSelected} select={selectFramework} frameworks={frameworksKeyed} />
                  </div>
                </DropDownContents>
                <DropDownContents {...frameworkSelectNonKeyed}>
                  <h3>Non-keyed frameworks:</h3>
                  <div>
                    <SelectBarFrameworks isSelected={frameworkSelectNonKeyed.isSelected} select={selectFramework} frameworks={frameworksNonKeyed}/>
                  </div>
                </DropDownContents>
              </DropDown>
              <div className="hspan"/>
              <DropDown label="Which benchmarks?" width='300px'>
                <SelectCategory benchmarks={benchmarksCPU} select={selectBenchmark} benchSelect={benchSelectCpu} label="Duration"/>
                <SelectCategory benchmarks={benchmarksStartup} select={selectBenchmark} benchSelect={benchSelectStartup} label="Startup"/>
                <SelectCategory benchmarks={benchmarksMEM} select={selectBenchmark} benchSelect={benchSelectMem} label="Memory"/>
              </DropDown>
              <div className="hspan"/>
              <div className="checkbox" style={{display:"inline-block"}}>
                  <label>
                    <input type="checkbox" onChange={(evt) => selectSeparateKeyedAndNonKeyed(evt.target.checked)} checked={separateKeyedAndNonKeyed} />
                    Separate keyed and non-keyed
                  </label>
              </div>
              <div className="hspan"/>
              <form className="form-inline" style={{display:"inline-block"}}>
                <div className="form-group">
                    <div className="hspan"/>
                    <select className="form-control" value={compareWith ? compareWith.name : ''} onChange={(evt) => selectComparison(evt.target.value)}>
                      <option value=''>Compare with ...</option>                        
                      <optgroup label="Keyed">
                        { frameworksKeyed.map(f => <option key={f.name} value={f.name}>{f.name}</option>) }
                      </optgroup>
                      <optgroup label="Non-keyed">
                        { frameworksNonKeyed.map(f => <option key={f.name} value={f.name}>{f.name}</option>) }
                      </optgroup>
                    </select>
                </div>
              </form>
              <div className="hspan"/>
              <div className="checkbox" style={{display:"inline-block"}}>
                  <label>
                    <input type="checkbox" onChange={(evt) => selectMedian(evt.target.checked)} checked={useMedian} />
                    Use median instead of mean
                  </label>
              </div>
            </div>
          </div>
        );
    }
}
