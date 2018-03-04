package com.moya.inventory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A InventoryReport.
 */
@Entity
@Table(name = "inventory_report")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InventoryReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "steel_pipe_type")
    private String steelPipeType;

    @Column(name = "thickness")
    private String thickness;

    @Column(name = "num")
    private Integer num;

    @OneToMany(mappedBy = "inventoryReport")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inventory> inventories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSteelPipeType() {
        return steelPipeType;
    }

    public InventoryReport steelPipeType(String steelPipeType) {
        this.steelPipeType = steelPipeType;
        return this;
    }

    public void setSteelPipeType(String steelPipeType) {
        this.steelPipeType = steelPipeType;
    }

    public String getThickness() {
        return thickness;
    }

    public InventoryReport thickness(String thickness) {
        this.thickness = thickness;
        return this;
    }

    public void setThickness(String thickness) {
        this.thickness = thickness;
    }

    public Integer getNum() {
        return num;
    }

    public InventoryReport num(Integer num) {
        this.num = num;
        return this;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Set<Inventory> getInventories() {
        return inventories;
    }

    public InventoryReport inventories(Set<Inventory> inventories) {
        this.inventories = inventories;
        return this;
    }

    public InventoryReport addInventories(Inventory inventory) {
        this.inventories.add(inventory);
        inventory.setInventoryReport(this);
        return this;
    }

    public InventoryReport removeInventories(Inventory inventory) {
        this.inventories.remove(inventory);
        inventory.setInventoryReport(null);
        return this;
    }

    public void setInventories(Set<Inventory> inventories) {
        this.inventories = inventories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        InventoryReport inventoryReport = (InventoryReport) o;
        if (inventoryReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inventoryReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InventoryReport{" +
            "id=" + getId() +
            ", steelPipeType='" + getSteelPipeType() + "'" +
            ", thickness='" + getThickness() + "'" +
            ", num=" + getNum() +
            "}";
    }
}
