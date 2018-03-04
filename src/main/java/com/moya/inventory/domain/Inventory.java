package com.moya.inventory.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Inventory.
 */
@Entity
@Table(name = "inventory")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Inventory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_date")
    private Instant entryDate;

    @Column(name = "exit_date")
    private Instant exitDate;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "wnet")
    private Double wnet;

    @Column(name = "num")
    private Integer num;

    @OneToOne
    @JoinColumn(unique = true)
    private Warehouse warehouse;

    @OneToOne
    @JoinColumn(unique = true)
    private SteelPipe steelPipe;

    @OneToOne
    @JoinColumn(unique = true)
    private Customer customer;

    @ManyToOne
    private InventoryReport inventoryReport;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getEntryDate() {
        return entryDate;
    }

    public Inventory entryDate(Instant entryDate) {
        this.entryDate = entryDate;
        return this;
    }

    public void setEntryDate(Instant entryDate) {
        this.entryDate = entryDate;
    }

    public Instant getExitDate() {
        return exitDate;
    }

    public Inventory exitDate(Instant exitDate) {
        this.exitDate = exitDate;
        return this;
    }

    public void setExitDate(Instant exitDate) {
        this.exitDate = exitDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Inventory customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Double getWnet() {
        return wnet;
    }

    public Inventory wnet(Double wnet) {
        this.wnet = wnet;
        return this;
    }

    public void setWnet(Double wnet) {
        this.wnet = wnet;
    }

    public Integer getNum() {
        return num;
    }

    public Inventory num(Integer num) {
        this.num = num;
        return this;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public Inventory warehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
        return this;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public SteelPipe getSteelPipe() {
        return steelPipe;
    }

    public Inventory steelPipe(SteelPipe steelPipe) {
        this.steelPipe = steelPipe;
        return this;
    }

    public void setSteelPipe(SteelPipe steelPipe) {
        this.steelPipe = steelPipe;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Inventory customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public InventoryReport getInventoryReport() {
        return inventoryReport;
    }

    public Inventory inventoryReport(InventoryReport inventoryReport) {
        this.inventoryReport = inventoryReport;
        return this;
    }

    public void setInventoryReport(InventoryReport inventoryReport) {
        this.inventoryReport = inventoryReport;
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
        Inventory inventory = (Inventory) o;
        if (inventory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inventory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inventory{" +
            "id=" + getId() +
            ", entryDate='" + getEntryDate() + "'" +
            ", exitDate='" + getExitDate() + "'" +
            ", customerName='" + getCustomerName() + "'" +
            ", wnet=" + getWnet() +
            ", num=" + getNum() +
            "}";
    }
}
